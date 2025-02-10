import express from "express";
import { AppContext, contextMiddleware, createAppContext } from "./lib/ctx";
import { config } from "./lib/config";

async function main() {
  let ctx: AppContext | null = null;

  try {
    ctx = createAppContext();
    const app = express();

    app.use(contextMiddleware);

    app.listen(config.HTTP_PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${config.HTTP_PORT}`);
    });
  } catch (error) {
    ctx?.stop();
  }
}

main();
