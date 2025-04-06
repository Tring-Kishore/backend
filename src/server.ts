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
      cors(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          const token = req.headers.authorization?.split(' ')[1] || '';
          if (!token) {
            return { user: null };
          }
          try {
            const decoded: any = jwt.verify(token, "Eoin Kishore");
            return { user: decoded };
          } catch (err) {
            return { user: null };
          }
        }
      })
    );
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/graphql`);
    });
  })
  .catch((error) => console.log(error));