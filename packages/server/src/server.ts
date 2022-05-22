import BodyParser from "body-parser";
import CookieParser from "cookie-parser";
import Cors from "cors";
import Express from "express";
import Session from "express-session";

import { authRouter } from "../src/auth/auth-router";

import("dotenv");

import { cardRouter } from "./card/card-router";
import { routerSwagger } from "./docs/swagger";
import { subjectRouter } from "./subject/subject-router";
import { errorHandler } from "./utils/error/errorHandler";
import { logger } from "./utils/logger";

const { PORT, SECRET_SESSION } = process.env;

export const app = Express();

app.use(Cors());
app.use(BodyParser.json());

app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);
app.use(CookieParser());
const TIME_SESSION = 1000 * 60 * 60 * 24;
app.use(
  Session({
    secret: SECRET_SESSION ?? "",
    saveUninitialized: true,
    cookie: { maxAge: TIME_SESSION },
    resave: false,
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
