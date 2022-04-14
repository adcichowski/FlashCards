import Joi from "joi";

import { HttpError } from "./error";
import { logger } from "./logger";

import type { NextFunction, Request, Response } from "express";

export const reusableValidation =
  (schema: Joi.ObjectSchema) =>
  (req: Request, _: Response, next: NextFunction) => {
    const { value, error } = Joi.compile(schema).validate(req.body);
    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ")
        .split(/\W/)
        .join(" ");
      logger.info(errorMessage);

      return next(new HttpError(400, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };
