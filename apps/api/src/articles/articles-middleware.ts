import type { NextFunction, Request, Response } from "express";
import { serviceArticles } from "./articles-service";
import { HttpError } from "utils/error/httpError";
import { articleUrlReq } from "./articles-schema";
import { InferType } from "yup";
export const checkArticleExist = async (
  req: Request<{}, {}, InferType<typeof articleUrlReq>>,
  _res: Response,
  next: NextFunction
) => {
  const existSameArticle = await serviceArticles.getArticleByUrl(req.body.url);
  if (existSameArticle) {
    next(new HttpError(400, "article exist with same url"));
  }
  next();
};
