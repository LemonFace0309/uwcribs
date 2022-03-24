import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import http from "http";

import * as resolvers from "@src/apollo/resolvers";
import typeDefs from "@src/apollo/typeDefs";

export const initApollo = (httpServer: http.Server): ApolloServer => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  return server;
};
