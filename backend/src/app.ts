import express, { NextFunction, Request, Response } from "express";
import { AppContext, createAppContext } from "./lib/ctx";
import { config } from "./lib/config";
import routes from "./routes";

async function main() {
  let ctx: AppContext | null = null;

  try {
    ctx = createAppContext();
    const app = express();

    app.use(express.json());
    app.use((req: Request, _res: Response, next: NextFunction) => {
      req.ctx = ctx as AppContext;
      next();
    });

    app.use("/auth", routes);

    app.listen(config.HTTP_PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${config.HTTP_PORT}`);
    });
  } catch (error) {
    ctx?.stop();
  }
}

main();
