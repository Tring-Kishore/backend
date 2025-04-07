import { createSchema } from './schema';
import dataSource from './database/data-source';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { User } from './modules/user/entity/user.entity';
import { IsNull } from 'typeorm';
import { GraphQLError } from 'graphql/error/GraphQLError';
//import helmet from 'helmet';
const app = express() as any;
const port = 4000;

//app.use(helmet());
dataSource.initialize()
  .then(async () => {
    console.log("DB Connected");
    const schema = await createSchema();
    const server = new ApolloServer({ schema});
    await server.start();
    app.use(
      '/graphql',
      cors({credentials:true}),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          const token = req.headers.authorization?.split(' ')[1] || '';
          if (!token) {
            return { user: null };
          }
          try {
            if(process.env.JWT_SECRET){
              const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
              const userRepository = dataSource.getRepository(User);
              const user = await userRepository.findOne({ 
              where: { id: decoded.userId, deleted_at: IsNull() } 
            });
            if (!user) {
              console.log('user not found');
              throw new Error("User not found");
            }
              console.log('the decoded value',decoded);
              
              return { user: decoded };
            }
            return { user: null };
          } catch (err : any) {
            console.log('jwt',err);
            throw new Error(err);
          }
        }
      })
    );
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/graphql`);
    });
  })
  .catch((error) => console.log(error));
