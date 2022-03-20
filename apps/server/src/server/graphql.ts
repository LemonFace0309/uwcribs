import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer, gql } from 'apollo-server-express';
import http from 'http';

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

export const initApollo = (httpServer: http.Server): ApolloServer => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  return server;
};
