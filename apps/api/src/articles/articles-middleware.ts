import type { NextFunction, Request, Response } from "express";
import * as serviceArticles from "./articles-service";
import { HttpError } from "utils/error/httpError";
import { articleUrlReq, deleteRateArticleSchema } from "./articles-schema";
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

export const checkIsUserRate = async (
  req: Request<{}, {}, InferType<typeof deleteRateArticleSchema>>,
  _res: Response,
  next: NextFunction
) => {
  const existRateArticle = await serviceArticles.getRateArticleByRateId({
    rateId: req.body.rateId,
    userId: _res.locals.user.id,
  });
  if (existRateArticle) {
    next(new HttpError(400, "rate not exist"));
  }
  next();
};
