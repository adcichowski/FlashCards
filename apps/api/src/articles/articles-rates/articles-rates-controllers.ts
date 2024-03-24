import { createRateArticleSchema } from "articles/articles-schema";
import { InferType } from "yup";
import { Request, Response } from "express";
import * as serviceArticles from "articles/articles-service";

export const createRateArticle = async (
  req: Request<
    { articleId: string },
    {},
    InferType<typeof createRateArticleSchema>
  >,
  res: Response
) => {
  const { rate } = req.body;
  const articleId = req.params.articleId;
  const userId = res.locals.user.id;
  const createdRate = await serviceArticles.createRateForArticle({
    articleId,
    rate,
    userId,
  });
  res.status(200).send(createdRate);
};

export const deleteRateArticle = async (
  req: Request<{ articleId: string; rateId: string }>,
  res: Response
) => {
  const { articleId, rateId } = req.params;
  await serviceArticles.removeRateFromArticle({
    articleId,
    rateId,
  });
  res.status(200).send();
};

export const changeRateArticle = async (
  req: Request<{ articleId: string; rateId: string }>,
  res: Response
) => {
  const { rateId } = req.params;
  await serviceArticles.changeRateForArticle({
    rate: req.body.rate,
    rateId,
  });
  res.status(200).send({ message: "correct change rate" });
};
