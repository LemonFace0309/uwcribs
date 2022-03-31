import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export type Context = ReturnType<typeof initContext>;

export const initContext = () => {
  const prisma = new PrismaClient();
  return { prisma };
};

export const attachContext = (context: Context) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.ctx = context;
    next();
  };
};
