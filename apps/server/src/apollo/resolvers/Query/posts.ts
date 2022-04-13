import type { QueryPostsArgs } from "@src/__generated__/graphql";
import type { Context } from "@src/server/context";

export const posts = async (
  _root: unknown,
  args: QueryPostsArgs,
  ctx: Context
) => {
  if (args.options && args.options.beds) {
    const res = await ctx.elastic.search({
      index: "posts_v1",
      query: {
        match: {
          availableBeds: args.options.beds,
        },
      },
    });
    return res.hits.hits.map((obj) => obj._source);
  }

  return await ctx.prisma.post.findMany({
    where: {
      flagged: false,
    },
    orderBy: {
      id: "desc",
    },
  });
};
