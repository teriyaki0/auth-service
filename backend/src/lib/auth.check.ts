import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import { JwtUtil } from "../utils/jwt.util";

export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Ошибка аутентификации" });
    return;
  }

  try {
    const decoded = JwtUtil.verifyRefreshToken(token);

    if (typeof decoded === "string") {
      res.status(401).json({ message: "Ошибка аутентификации" });
      return;
    }

    req.me = decoded.user as User;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка аутентификации" });
  }
};
