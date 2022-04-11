/**
 * Source of records for Elastic.
 *
 */
export interface ISource<T extends { id: unknown }> {
  collect(): AsyncGenerator<T, void, undefined>;
}
