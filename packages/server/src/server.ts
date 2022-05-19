import BodyParser from "body-parser";
import Cors from "cors";
import Express from "express";

import { authRouter } from "../src/auth/auth-router";
import("dotenv");

import { cardRouter } from "./card/card-router";
import { routerSwagger } from "./docs/swagger";
import { subjectRouter } from "./subject/subject-router";
import { errorHandler } from "./utils/error/errorHandler";
import { logger } from "./utils/logger";

const { PORT } = process.env;

export const app = Express();

app.use(Cors());
app.use(BodyParser.json());

app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);

app.use(subjectRouter, cardRouter, authRouter, routerSwagger);
app.use(errorHandler);
app.disable("x-powered-by");
const server = app.listen(PORT, () => {
  logger.info(`
  🚀 Server ready at: http://localhost:${process.env.PORT}
  `);
});
export { server };
