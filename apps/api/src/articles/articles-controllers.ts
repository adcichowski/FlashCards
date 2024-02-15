import type { Response, Request } from "express";
import { serviceArticles } from "./articles-service";
import * as cheerio from "cheerio";

import { articleSchema, articleUrlReq } from "./articles-schema";
import { getErrorMessage } from "utils/error/errorValidation";
import { InferType } from "yup";

export const getAllArticles = async (_req: Request, res: Response) => {
  const articles = await serviceArticles.getArticles();
  res.json({ articles });
};

export const createArticle = async (
  req: Request<{}, {}, InferType<typeof articleUrlReq>>,
  res: Response
) => {
  const articleRes = await fetch(req.body.url, { method: "GET" });

  if (!articleRes.ok) {
    return res.status(404).send({ message: "problem during fetching" });
  }
  const text = await articleRes.text();
  const dom = cheerio.load(text);
  const { url } = req.body;
  const generatedArticle = {
    imageSrc: dom('meta[property="og:image"]').attr("content"),
    title: dom("title").text(),
    url,
  };

  try {
    const securedArticle = articleSchema.validateSync(generatedArticle);
    const createdArticle = await serviceArticles.createArticle(securedArticle);
    return res.send({ id: createdArticle.id });
  } catch (error) {
    return res.status(400).send({ message: getErrorMessage(error) });
  }
};
