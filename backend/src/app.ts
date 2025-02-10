import express from "express";
import { AppContext, contextMiddleware, createAppContext } from "./lib/ctx";
import { config } from "./lib/config";
import routes from "./routes";

async function main() {
  let ctx: AppContext | null = null;

  try {
    ctx = createAppContext();
    const app = express();

    app.use(express.json());
    app.use(contextMiddleware);
    app.use("/auth", routes);

    app.listen(config.HTTP_PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${config.HTTP_PORT}`);
    });
  } catch (error) {
    ctx?.stop();
  }
}

main();
