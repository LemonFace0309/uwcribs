/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html
 */
export type FieldMapping =
  | FieldMappingKeyword
  | FieldMappingDate
  | FieldMappingShort
  | FieldMappingInteger
  | FieldMappingFloat
  | FieldMappingDouble
  | FieldMappingLong
  | FieldMappingBoolean
  | FieldMappingText
  | FieldMappingNested;

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/keyword.html
 */
export type FieldMappingKeyword = { type: "keyword" };

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/date.html
 */
export type FieldMappingDate = { type: "date" };

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/number.html
 */
export type FieldMappingShort = { type: "short" };

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/number.html
 */
export type FieldMappingInteger = { type: "integer" };

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/number.html
 */
export type FieldMappingFloat = { type: "float" };

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/number.html
 */
export type FieldMappingDouble = { type: "double" };

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/number.html
 */
export type FieldMappingLong = { type: "long" };

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/boolean.html
 */
export type FieldMappingBoolean = { type: "boolean" };

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/text.html
 */
export type FieldMappingText = { type: "text"; analyzer?: string };

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html
 */
export type FieldMappingNested = {
  type: "object" | "nested";
  dynamic: "strict";
  properties: Record<string, FieldMapping>;
};

export type BulkOperation = "index" | "create" | "update" | "delete";

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
