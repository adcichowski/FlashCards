import type { Response, Request } from "express";
import * as cheerio from "cheerio";
import * as serviceArticles from "./articles-service";
import { createArticleSchema, articleUrlReq } from "./articles-schema";
import { getErrorMessage } from "utils/error/errorValidation";
import { InferType } from "yup";

export const getAllArticles = async (_req: Request, res: Response) => {
  if (res.locals.user.role === "admin") {
    const articles = await serviceArticles.getAllArticles({
        userId: res.locals.user.id,
        page: _req.query.page as string,
      })
    return res.status(200).json(articles);
  }
  // const articles = mapperArticles({
  //   sumRatesPerArticle: await serviceArticles.getSumRatesPerArticle(),
  //   articles: await serviceArticles.getVerifiedArticles(res.locals.user.id),
  // });
  return res.status(200).json({ articles:[] });
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
  const parsedUrl = new URL(url);
  const imageSrc = dom('meta[property="og:image"]').attr("content");
  const isCorrectImageSrc = imageSrc?.startsWith("https://");

  const generatedArticle = {
    imageSrc: isCorrectImageSrc
      ? imageSrc
      : `https://${parsedUrl.host}${imageSrc}`,
    title: dom("h1").text(),
    url,
  };

  try {
    const securedArticle = createArticleSchema.validateSync(generatedArticle);
    const createdArticle = await serviceArticles.createArticle(securedArticle);
    return res.send(createdArticle);
  } catch (error) {
    return res.status(400).send({ message: getErrorMessage(error) });
  }
};
