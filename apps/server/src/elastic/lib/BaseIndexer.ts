import { Client as ElasticCLient } from "@elastic/elasticsearch";

import { ISource } from "@src/elastic/lib/ISource";
import { BulkOperation, BulkResponse } from "@src/elastic/lib/types";
import { batch } from "@src/elastic/lib/utils";
import { Context } from "@src/server/context";

export type BaseIndexerParams<Doc extends { id: unknown }> = {
  ctx: Context;
  source: ISource<Doc>;
  index: string;
};

const BATCH_SIZE = 200;

export class BaseIndexer<Doc extends { id: unknown }> {
  elastic: ElasticCLient;
  source: ISource<Doc>;
  index: string;

  constructor({ ctx, source, index }: BaseIndexerParams<Doc>) {
    this.elastic = ctx.elastic;
    this.source = source;
    this.index = index;
  }

  /**
   * Reindex all records available in the source.
   */
  async reindexAll(): Promise<void> {
    this.deleteIndex();

    this.log("Reindexing all docs");
    const docs = await this.source.collect();
    for await (const chunk of batch(docs, BATCH_SIZE)) {
      await this.bulk("index", chunk);
    }
  }

  /**
   * Deletes the Elasticsearch index.
   */
  async deleteIndex(): Promise<void> {
    const { index, elastic } = this;
    try {
      await elastic.indices.delete({ index });
      this.log(`Deleted existing index`);
    } catch (err) {
      this.log(`Index does not exist yet`);
    }
  }

  protected async bulk<O extends BulkOperation, D extends { id: unknown }>(
    operation: O,
    docs: D[]
  ): Promise<void> {
    const { index, elastic } = this;
    const operations = [];
    for (const doc of docs) {
      operations.push({ [operation]: { _index: index, _id: doc.id } });
      operations.push({ ...doc });
    }

    // wait_for is important, without it won't be able to delete old records.
    // See: https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html#docs-delete-by-query-api-desc
    const res = await elastic.bulk({
      operations,
      refresh: "wait_for",
    });

    this.log(`Bulk index took ${res.took}ms to finish`);
  }

  protected log(msg: string) {
    // eslint-disable-next-line no-console
    console.log(`[${this.index}] ${msg}`);
  }
}
