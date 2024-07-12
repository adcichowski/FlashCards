import { HttpError } from "utils/error/httpError";
import { addToolSchema } from "./tools-schema";
import * as serviceTools from "./tools-service";
import type { Response, Request, NextFunction } from "express";
import { InferType } from "yup";

export const checkToolExist = async (
  req: Request<{}, {}, InferType<typeof addToolSchema>>,
  _res: Response,
  next: NextFunction
) => {
  const existSameArticle = await serviceTools.getToolByUrl(req.body.url);
  if (existSameArticle) {
    next(new HttpError(400, "tool exist with same url"));
  }
  next();
};
