import BodyParser from "body-parser";
import Cors from "cors";
import Express from "express";

import { cardRouter } from "./card/card-router";
import { subjectRouter } from "./subject/subject-router";
import { routerSwagger } from "./swagger/swagger";
import { errorHandler } from "./utils/error/errorHandler";
import { swaggerDocs } from "./utils/swagger";

const { PORT, NODE_ENV } = process.env;

export const app = Express();

app.use(Cors());
app.use(BodyParser.json());

app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);

app.use(subjectRouter, cardRouter, routerSwagger);
app.use(errorHandler);
app.disable("x-powered-by");
app.listen(PORT, () => {
  swaggerDocs(app, PORT ?? "4000");
  console.log(`
  🚀 Server ready at: http://${NODE_ENV || `localhost:${PORT}`}
  `);
});
