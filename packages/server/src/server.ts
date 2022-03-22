import { PrismaClient } from "@prisma/client";

import bodyParser from "body-parser";
import express from "express";
import { subjectRouter } from "./subject/subject.router";
import { cardRouter } from "./card/card.router";
const PORT = 3001;

export const prisma = new PrismaClient();
export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", cardRouter);
app.use("/subject", subjectRouter);
app.disable("x-powered-by");
app.listen(PORT, () => {
  console.log(`
  🚀 Server ready at: http://localhost:${PORT}
  `);
});
