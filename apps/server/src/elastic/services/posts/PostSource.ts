import { Post } from "@src/__generated__/graphql";
import {
  GetPostsDocument,
  GetPostsQuery,
  GetPostsQueryVariables,
} from "@src/__generated__/operations";
import { ISource } from "@src/elastic/lib/ISource";
import { Context } from "@src/server/context";

export class PostSource extends ISource<Post> {
  constructor(ctx: Context) {
    super(ctx);
  }

  async collect() {
    const posts = await this.ctx.apollo.query<
      GetPostsQuery,
      GetPostsQueryVariables
    >({
      query: GetPostsDocument,
    });
    return posts.data.posts;
  }
}
