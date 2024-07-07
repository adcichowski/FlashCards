import BodyParser from "body-parser";
import CookieParser from "cookie-parser";
import Cors from "cors";
import Express from "express";

import { cardRouter } from "./cards/cards-router";
import { routerSwagger } from "./docs/swagger";
import { tagsRouter } from "./tags/tags-router";
import { errorHandler } from "./utils/error/errorHandler";
import { logger } from "./utils/logger";
import { getEnv } from "./utils/utils";
import { articlesRouter } from "articles/articles-router";
import { authRouter } from "auth/auth-router";
import { toolsRouter } from "tools/tools-router";

export const app = Express();

app.use(Cors());
app.use(BodyParser.json());

app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);
app.use(CookieParser());

app.use(
  routerSwagger,
  authRouter,
  tagsRouter,
  articlesRouter,
  cardRouter,
  toolsRouter
);
app.use(errorHandler);
app.disable("x-powered-by");
const server = app.listen(getEnv("PORT"), () => {
  logger.info(`
  🚀 Server ready at: http://localhost:${process.env.PORT}
  `);
});
export { server };

process.on("uncaughtException", (error) => {
  console.error(error);
});
