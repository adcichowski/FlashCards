import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import express from "express";
import { cardRouter } from "./routes/card/card.router";
export const prisma = new PrismaClient();
export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/card", cardRouter);
app.disable("x-powered-by");
app.listen(3000, () => {
  console.log(`
  🚀 Server ready at: http://localhost:3000
  `);
});
