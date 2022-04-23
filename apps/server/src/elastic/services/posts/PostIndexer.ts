import { Post } from "@src/__generated__/graphql";
import { BaseIndexer } from "@src/elastic/lib/BaseIndexer";
import { Context } from "@src/server/context";

import { PostSource } from "./PostSource";

export class PostIndexer extends BaseIndexer<Post> {
  constructor(ctx: Context) {
    super({ ctx, source: new PostSource(ctx), index: "posts_v1" });
  }
}
