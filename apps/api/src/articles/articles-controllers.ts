import type { Response, Request } from "express";
import * as cheerio from "cheerio";
import * as serviceArticles from "./articles-service";
import {
  createArticleSchema,
  articleUrlReq,
  editArticleSchema,
} from "./articles-schema";
import { getErrorMessage } from "utils/error/errorValidation";
import { InferType, ValidationError } from "yup";

export const getAllArticles = async (_req: Request, res: Response) => {
  if (res.locals.user.role === "admin") {
    const articles = await serviceArticles.getAllArticles({
      userId: res.locals.user.id,
      page: _req.query.page as string,
      tags: res.locals.tags,
    });
    return res.status(200).json(articles);
  }
  const articles = await serviceArticles.getVerifiedArticles({
    userId: res.locals.user.id,
    page: _req.query.page as string,
    tags: res.locals.tags,
  });
  return res.status(200).json(articles);
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
  const host = new URL(url).host;

  const iconUrl = dom('link[rel*="icon"]') || dom('link[rel*="shortcut icon"]');
  const generatedArticle = {
    faviconUrl: iconUrl.attr("href")?.startsWith("/")
      ? `https://${host}${iconUrl.attr("href")}`
      : iconUrl.attr("href"),
    title: dom("title").first().text(),
    heading: dom("h1").text(),
    url,
  };
  try {
    const securedArticle = createArticleSchema.validateSync(generatedArticle);
    const createdArticle = await serviceArticles.createArticle({
      ...securedArticle,
      userId: res.locals.user.id,
    });
    return res.send(createdArticle);
  } catch (error) {
    return res.status(400).send({ message: getErrorMessage(error) });
  }
};

export const deleteArticle = async (
  req: Request<{ articleId: string }>,
  res: Response
) => {
  try {
    await serviceArticles.deleteArticle(req.params.articleId);
    return res.status(200).send({ message: "correct deleted article" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "problem during delete article" });
  }
};

export const editArticle = async (
  req: Request<{ articleId: string }>,
  res: Response
) => {
  try {
    const securedArticle = editArticleSchema.validateSync(req.body);
    await serviceArticles.editArticle({
      articleId: req.params.articleId,
      ...securedArticle,
    });

    return res.status(200).send({ message: "correct update article" });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).send({ message: error.message });
    }
    return res.status(400).send({ message: "problem during update article" });
  }
};

export const getArticleById = async (
  req: Request<{ articleId: string }>,
  res: Response
) => {
  try {
    const article = await serviceArticles.getArticleById(req.params.articleId);
    return res.status(200).send({ article });
  } catch (error) {
    return res
      .status(400)
      .send({ message: `problem to get ${req.params.articleId} article` });
  }
};
