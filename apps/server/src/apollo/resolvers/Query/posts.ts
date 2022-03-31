import type { Context } from "@src/server/context";

export const posts = async (_root: unknown, _args: never, ctx: Context) => {
  return await ctx.prisma.post.findMany();
};
