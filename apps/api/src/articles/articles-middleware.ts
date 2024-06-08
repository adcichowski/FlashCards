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
  const rate = await serviceArticles.getRateArticle({
    rateId: req.params.rateId,
    userId: _res.locals.user.id,
  });
  if (!rate) {
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

export const checkRateExistFromParams = async (
  req: Request<{ rateId: string }>,
  res: Response,
  next: NextFunction
) => {
  const rateArticle = await serviceArticles.getRateArticle({
    rateId: req.params.rateId,
    userId: res.locals.user.id,
  });
  if (!rateArticle) {
    next(new HttpError(400, "rated article not exist"));
  }
  next();
};

export const blockSecondRate = async (
  req: Request<{ articleId: string }>,
  res: Response,
  next: NextFunction
) => {
  const rateArticle = await serviceArticles.findUserRateForArticle({
    articleId: req.params.articleId,
    userId: res.locals.user.id,
  });
  if (rateArticle) {
    next(
      new HttpError(
        400,
        "can't create second rate for this article, should update the rate"
      )
    );
  }
  next();
};

export const checkAdminAccess = (
  _req: Request<{ articleId: string }>,
  res: Response,
  next: NextFunction
) => {
  const role = res.locals.user.role;
  if (role !== "admin") {
    next(new HttpError(403, "you don't have access to do this thing"));
  }
  next();
};
