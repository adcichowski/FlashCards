import Cors from "cors";
import Express from "express";

import { cardRouter } from "./card/card-router";
import { subjectRouter } from "./subject/subject-router";
import { routerSwagger } from "./swagger/swagger";

const { PORT, NODE_ENV } = process.env;

export const app = Express();
app.use(Cors());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(subjectRouter, cardRouter, routerSwagger);

app.disable("x-powered-by");
app.listen(PORT, () => {
  console.log(`
  🚀 Server ready at: http://${NODE_ENV || `localhost:${PORT}`}
  `);
});
