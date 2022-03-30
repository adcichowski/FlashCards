import BodyParser from "body-parser";
import Cors from "cors";
import Express from "express";

import { cardRouter } from "./card/card.router";
import { subjectRouter } from "./subject/subject.router";
const { PORT, NODE_ENV } = process.env;

export const app = Express();
app.use(Cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(subjectRouter, cardRouter);

app.disable("x-powered-by");
app.listen(PORT, () => {
  console.log(`
  🚀 Server ready at: http://${NODE_ENV || `localhost:${PORT}`}
  `);
});
