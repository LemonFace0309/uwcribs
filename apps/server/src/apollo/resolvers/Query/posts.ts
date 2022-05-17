import {
  QueryDslBoolQuery,
  QueryDslQueryContainer,
} from "@elastic/elasticsearch/lib/api/types";

import type { PostOptions, QueryPostsArgs } from "@src/__generated__/graphql";
import type { Context } from "@src/server/context";

export const posts = async (
  _root: unknown,
  args: QueryPostsArgs,
  ctx: Context
) => {
  if (args.options) {
    const res = await ctx.elastic.search({
      index: "posts_v1",
      query: constructPostsQuery(args.options),
    });
    return res.hits.hits.map((obj) => obj._source);
  }

  return await ctx.prisma.post.findMany({
    where: {
      isAvailable: true,
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
  const must: QueryDslBoolQuery["must"] = [];

  if (options.season) {
    must.push({
      match: {
        season: options.season,
      },
    });
  }
  if (options.availableBeds) {
    must.push({
      match: {
        availableBeds: options.availableBeds,
      },
    });
  }
  if (options.baths) {
    must.push({
      range: {
        baths: {
          gte: options.baths,
        },
      },
    });
  }

  if (must.length) {
    query.bool = {};
    query.bool.must = must;
  } else {
    query.match_all = {};
  }

  return query;
};
