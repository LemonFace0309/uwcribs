/* eslint-disable no-console */

import { PostIndexer } from "@src/elastic/services/posts/PostIndexer";
import { initContext } from "@src/server/context";

async function main(): Promise<void> {
  const ctx = initContext();
  const postIndexed = new PostIndexer(ctx);

  await Promise.all([postIndexed.reindexAll()]);
}

main()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    console.error(err.stack);
    console.dir(err?.meta?.body, { depth: 4 });
    console.error("Failed");
    process.exit(1);
  });
