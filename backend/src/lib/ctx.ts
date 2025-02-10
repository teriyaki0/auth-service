import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { redis } from "../config/redis";

export const createAppContext = () => {
  return {
    prisma,
    redis,
    stop: async () => {
      await prisma.$disconnect();
      await redis.disconnect();
    },
  };
};

export function contextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.ctx = createAppContext();

  res.on("finish", () => {
    req.ctx.stop();
  });

  next();
}

export type AppContext = ReturnType<typeof createAppContext>;
