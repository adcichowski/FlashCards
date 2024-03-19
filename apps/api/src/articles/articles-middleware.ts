import type { NextFunction, Request, Response } from "express";
import * as serviceArticles from "./articles-service";
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

export const checkIsUserRate = async (
  req: Request<{ rateId: string; articleId: string }>,
  _res: Response,
  next: NextFunction
) => {
  const existRateArticle = await serviceArticles.getRateArticleByRateId({
    rateId: req.params.rateId,
    userId: _res.locals.user.id,
  });
  if (existRateArticle) {
    next(new HttpError(400, "rate not exist"));
  }
  next();
};

export const checkArticleExistFromParams = async (
  req: Request<{ articleId: string }>,
  _res: Response,
  next: NextFunction
) => {
  const ratedArticle = await serviceArticles.getArticleById(
    req.params.articleId
  );
  if (!ratedArticle) {
    next(new HttpError(400, "rated article not exist"));
  }
  next();
};
