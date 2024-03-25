import { getErrorMessage } from "./error/errorValidation";
import { HttpError } from "./error/httpError";

import type { NextFunction, Request, Response } from "express";
import Yup from "yup";
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

export const validationParams =
  <T extends string[]>(availableParams: T) =>
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      const generatedSchema = availableParams.reduce((pre, init) => {
        return { ...pre, [init]: schemaBasedOnParamName(init) };
      }, {});
      await Yup.object(generatedSchema).validate(req.params);
      return next();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      return next(new HttpError(400, errorMessage));
    }
  };

const schemaBasedOnParamName = (name: string) => {
  switch (name) {
    case "page":
      return Yup.number().optional().label(name);

    default:
      return Yup.string().uuid().required().label(name);
  }
};
