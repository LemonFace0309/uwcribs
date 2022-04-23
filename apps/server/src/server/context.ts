import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { Client as ElasticCLient } from "@elastic/elasticsearch";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { schema } from "@src/server/schema";

import "dotenv/config";

export type ContextParams = {
  prisma: PrismaClient;
  elastic: ElasticCLient;
};

export const initContext = () => {
  const prisma = new PrismaClient();
  const elastic = new ElasticCLient({
    cloud: { id: process.env.ELASTIC_CLOUD_ID as string },
    auth: { apiKey: process.env.ELASTIC_API_KEY_ENCODED as string },
  });

  return new Context({ elastic, prisma });
};

export const attachContext = (context: Context) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.ctx = context;
    next();
  };
};

export class Context {
  prisma: PrismaClient;
  elastic: ElasticCLient;
  private _apollo: ApolloClient<unknown> | null;

  constructor(params: ContextParams) {
    this.prisma = params.prisma;
    this.elastic = params.elastic;
    this._apollo = null;
  }

  /**
   * Used in elastic indexing
   */
  get apollo(): ApolloClient<unknown> {
    if (!this._apollo) {
      this._apollo = new ApolloClient({
        cache: new InMemoryCache(),
        link: new SchemaLink({
          schema,
          context: this,
        }),
      });
    }
    return this._apollo;
  }
}
