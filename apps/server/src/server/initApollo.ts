import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import http from "http";

import { schema } from "@src/server/schema";

export const initApollo = (httpServer: http.Server): ApolloServer => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      return req.ctx;
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // used to allow apollo server to shutdown gracefully with express
  });
  return server;
};
