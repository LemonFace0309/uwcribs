import { QueryDslQueryContainer } from "@elastic/elasticsearch/lib/api/types";

import type { PostOptions, QueryPostsArgs } from "@src/__generated__/graphql";
import type { Context } from "@src/server/context";

export const posts = async (
  _root: unknown,
  args: QueryPostsArgs,
  ctx: Context
) => {
  console.log("hehe");
  if (args.options) {
    const res = await ctx.elastic.search({
      index: "posts_v1",
      query: constructPostsQuery(args.options),
    });
    return res.hits.hits.map((obj) => obj._source);
  }

  return await ctx.prisma.post.findMany({
    where: {
      // flagged: false,
      confirmed: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};

// Todo(Charles): refactor to make more scalable with incoming filters
const constructPostsQuery = (options: PostOptions): QueryDslQueryContainer => {
  const query: QueryDslQueryContainer = {};
  const match: typeof query.match = {};

  if (options.season) {
    match.season = options.season;
  }
  if (options.availableBeds) {
    match.availableBeds = options.availableBeds;
  }
  if (options.baths) {
    match.baths = options.baths;
  }

  if (Object.keys(match).length) {
    query.match = match;
  } else {
    query.match_all = {};
  }

  return query;
};
