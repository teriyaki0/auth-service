import { User } from "@prisma/client";
import { Request } from "express";
import { AppContext } from "./lib/ctx";

declare module "express-serve-static-core" {
  interface Request {
    ctx: AppContext;
  }
}

declare module "*.json" {
  export default string;
}
