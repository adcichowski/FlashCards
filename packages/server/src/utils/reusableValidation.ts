import { getErrorMessage } from "./error/errorValidation";
import { HttpError } from "./error/httpError";

import type { NextFunction, Request, Response } from "express";
import type Yup from "yup";
import type { ObjectShape } from "yup/lib/object";

export const reusableValidation =
  <T extends ObjectShape>(schema: Yup.ObjectSchema<T>) =>
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      const value = await schema.validate(req.body);
      Object.assign(req, value);
      return next();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      return next(new HttpError(400, errorMessage));
    }
  };
