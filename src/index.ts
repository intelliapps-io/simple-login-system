import "reflect-metadata";
import Express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { resolvers } from "./modules/resolvers";
import { authMiddleware, authChecker } from "./helpers/auth";

const main = async () => {
  const httpPort = 80;
  await createConnection();

  const schema = await buildSchema({
    resolvers,
    authChecker,
    emitSchemaFile: {
      path: "./generated/schema.graphql"
    }
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  });

  const app = Express();

  app.use(cookieParser())

  app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
  }))

  app.use(authMiddleware);

  apolloServer.applyMiddleware({ app });

  app.listen(httpPort, () => console.log(`
    - GraphQL Playground: http://localhost:${httpPort}/graphql
    - pgAdmin: http://localhost:5050
      email: admin@local.host
      password: postgres
    - postgres: 
      username: postgres
      password: postgres
  `));
}

main(); 