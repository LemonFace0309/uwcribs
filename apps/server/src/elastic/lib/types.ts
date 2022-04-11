export type BulkOperation = "index";

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html#bulk-api-response-body
 */
export type BulkResponse<O extends BulkOperation> = {
  errors: number;
  items: Array<{
    [k in O]: {
      _id: string | number;
      result: string;
      error?: {
        reason: string;
      };
    };
  }>;
};
