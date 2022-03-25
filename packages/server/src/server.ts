import { PrismaClient } from "@prisma/client";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import { subjectRouter } from "./subject/subject.router";
import { cardRouter } from "./card/card.router";
const { PORT, NODE_ENV } = process.env;

export const prisma = new PrismaClient();
export const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cardRouter, subjectRouter);

app.disable("x-powered-by");
app.listen(PORT, () => {
  console.log(`
  🚀 Server ready at: http://${NODE_ENV || `http://localhost:${PORT}`}
  `);
});
