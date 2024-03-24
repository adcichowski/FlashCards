import { logger } from "../logger";

import { HttpError } from "./httpError";
import { HttpStatusCode } from "./httpStatusCodes";

import type { Response, Request, NextFunction } from "express";
export const errorHandler = (
  err: HttpError | Error,
  _: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);

  logger.error(err.message || "Error!");
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      name: err.name,
      message: err.message,
      body: err.body,
    });
  }
  return res
    .status(HttpStatusCode.BadRequest)
    .json({ name: "Error", message: err.message });
};
