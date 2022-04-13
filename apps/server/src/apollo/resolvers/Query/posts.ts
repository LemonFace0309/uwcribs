import type { QueryPostsArgs } from "@src/__generated__/graphql";
import type { Context } from "@src/server/context";

export const posts = async (
  _root: unknown,
  args: QueryPostsArgs,
  ctx: Context
) => {
  if (args.options && args.options.availableBeds) {
    const res = await ctx.elastic.search({
      index: "posts_v1",
      query: {
        match: {
          availableBeds: args.options.availableBeds,
        },
      },
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
