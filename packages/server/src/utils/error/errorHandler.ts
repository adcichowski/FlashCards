import { logger } from "../logger";

import { HttpError } from "./httpError";

import type { Response, Request, NextFunction } from "express";
export const errorHandler = (
  err: HttpError | Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    logger.error("Error!");
    if (err instanceof HttpError) {
      return res
        .status(err.statusCode)
        .json({ name: err.name, message: err.message, body: err.body });
    }
    return res.status(500).json({ name: "Error", message: err.message });
  }

  next();
};
