import BodyParser from "body-parser";
import Cors from "cors";
import Express from "express";

import { cardRouter } from "./card/card-router";
import { subjectRouter } from "./subject/subject-router";
import { routerSwagger } from "./swagger/swagger";
import { errorHandler } from "./utils/error/errorHandler";
import { logger } from "./utils/logger";
import { swaggerRouter } from "./utils/swagger";

const { PORT, NODE_ENV } = process.env;

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
app.listen(PORT, () => {
  logger.info(`
  🚀 Server ready at: http://${NODE_ENV || `localhost:${PORT}`}
  `);
});
