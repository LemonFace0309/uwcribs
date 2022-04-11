import { Client as ElasticCLient } from "@elastic/elasticsearch";

import { ISource } from "@src/elastic/lib/ISource";
import { BulkOperation, BulkResponse } from "@src/elastic/lib/types";
import { batch } from "@src/elastic/lib/utils";

export type BaseIndexerParams<Doc extends { id: unknown }> = {
  elastic: ElasticCLient;
  source: ISource<Doc>;
  index: string;
};

const BATCH_SIZE = 200;

export default class BaseIndexer<Doc extends { id: unknown }> {
  elastic: ElasticCLient;
  source: ISource<Doc>;
  index: string;

  constructor({ elastic, source, index }: BaseIndexerParams<Doc>) {
    this.elastic = elastic;
    this.source = source;
    this.index = index;
  }

  /**
   * Reindex all records available in the source.
   */
  async reindexAll(): Promise<void> {
    this.deleteIndex();

    this.log("Reindexing all docs");
    const docs = this.source.collect();
    for await (const chunk of batch(docs, BATCH_SIZE)) {
      await this.bulk("index", chunk);
    }
  }

  /**
   * Deletes the Elasticsearch index.
   */
  async deleteIndex(): Promise<void> {
    const { index, elastic } = this;
    await elastic.indices.delete({ index });
    this.log(`Deleted existing index`);
  }

  protected async bulk<O extends BulkOperation, D extends { id: unknown }>(
    operation: O,
    docs: D[]
  ): Promise<void> {
    const { index, elastic } = this;
    const body = [];
    for (const doc of docs) {
      body.push({ [operation]: { _index: index, _id: doc.id } });
      body.push({ ...doc });
    }

    const res = await elastic.bulk({
      body,
      refresh: "wait_for",
    });

    console.log(res);
  }

  protected log(msg: string) {
    // eslint-disable-next-line no-console
    console.log(`[${this.index}] ${msg}`);
  }
}
