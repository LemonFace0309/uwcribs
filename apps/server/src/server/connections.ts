import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const initConnections = () => {
  const prisma = new PrismaClient();
  return { prisma };
};

export const attachConnections = (
  connections: ReturnType<typeof initConnections>
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.ctx = connections;
    next();
  };
};
