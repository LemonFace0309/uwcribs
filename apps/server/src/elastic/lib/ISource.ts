import { Context } from "@src/server/context";

/**
 * Source of records for Elastic.
 *
 */
export abstract class ISource<T extends { id: unknown }> {
  ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  abstract collect(): Promise<T[]>;
}
