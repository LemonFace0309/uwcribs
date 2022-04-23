import { makeExecutableSchema } from "@graphql-tools/schema";

import * as resolvers from "@src/apollo/resolvers";
import typeDefs from "@src/apollo/typeDefs";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
