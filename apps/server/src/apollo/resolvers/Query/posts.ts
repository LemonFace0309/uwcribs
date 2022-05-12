import type { QueryPostsArgs } from "@src/__generated__/graphql";
import type { Context } from "@src/server/context";

export const posts = async (
  _root: unknown,
  args: QueryPostsArgs,
  ctx: Context
) => {
  if (args.options) {
    const res = await ctx.elastic.search({
      index: "posts_v1",
      query: {
        match: {
          season: args.options.season || undefined,
          availableBeds: args.options.availableBeds || undefined,
          baths: args.options.baths || undefined,
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
