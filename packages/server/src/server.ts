import BodyParser from "body-parser";
import Cors from "cors";
import Express from "express";
import("dotenv");

import { cardRouter } from "./card/card-router";
import { subjectRouter } from "./subject/subject-router";
import { routerSwagger } from "./swagger/swagger";
import { errorHandler } from "./utils/error/errorHandler";
import { logger } from "./utils/logger";
import { swaggerRouter } from "./utils/swagger";

const { PORT } = process.env;

export const app = Express();

app.use(Cors());
app.use(BodyParser.json());

app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);

app.use(swaggerRouter, subjectRouter, cardRouter, routerSwagger);
app.use(errorHandler);
app.disable("x-powered-by");
const server = app.listen(PORT, () => {
  logger.info(`
  🚀 Server ready at: http://localhost:${process.env.PORT}
  `);
});
export { server };
