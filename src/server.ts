import { createSchema } from './schema';
import dataSource from './database/data-source';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 4000;


dataSource.initialize()
  .then(async () => {
    console.log("DB Connected");

    
    const schema = await createSchema();

    
    const server = new ApolloServer({ schema });
    await server.start();

    
    app.use(
      '/graphql',
      cors({ origin: "http://localhost:3000", credentials: true }),
      bodyParser.json(),
      expressMiddleware(server) 
    );

    
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/graphql`);
    });
  })
  .catch((error) => console.log(error));