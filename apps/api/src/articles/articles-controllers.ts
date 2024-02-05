import type { Response, Request } from "express";
import { serviceArticles } from "./articles-service";
import * as cheerio from "cheerio";
import { HttpError } from "utils/error/httpError";

export const getAllArticles = async (_req: Request, res: Response) => {
  const articles = await serviceArticles.getArticles();
  res.json(articles);
};

export const createArticle = async (req: Request, res: Response) => {
  const articleRes = await fetch(
    "https://www.joshwcomeau.com/css/interactive-guide-to-grid/",
    { method: "GET" }
  );
  const text = await articleRes.text();
  const dom = cheerio.load(text);
  const title = dom("title").text();
  const imageSrc = dom('meta[property="og:image"]').attr("content");
  const url = "https://www.joshwcomeau.com/css/interactive-guide-to-grid/";

  if (!imageSrc) {
    return res
      .status(400)
      .json(new HttpError(400, `Website don't have open graph metadata image`));
  }

  const createdArticle = await serviceArticles.createArticle({
    imageSrc,
    title,
    url,
  });
  return res.send({ id: createdArticle.id });
};
