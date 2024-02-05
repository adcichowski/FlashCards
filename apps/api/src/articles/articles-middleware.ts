import type { NextFunction, Request, Response } from "express";
import { serviceArticles } from "./articles-service";
import { HttpError } from "utils/error/httpError";
export const checkArticleExist = async (
  _req: Request<unknown, unknown, { url: string }>,
  _res: Response,
  next: NextFunction
) => {
  const existSameArticle = await serviceArticles.getArticleByUrl(
    "https://www.joshwcomeau.com/css/interactive-guide-to-grid/"
  );
  if (existSameArticle) {
    next(new HttpError(400, "Article exist with same url"));
  }
  next();
};
