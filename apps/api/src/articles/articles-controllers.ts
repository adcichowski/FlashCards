import type { Response, Request } from "express";
import { serviceArticles } from "./articles-service";
import * as cheerio from "cheerio";

import { createArticleSchema, articleUrlReq } from "./articles-schema";
import { getErrorMessage } from "utils/error/errorValidation";
import { InferType } from "yup";
import { mapperArticles } from "./articles-mappers";
import { userService } from "user/user-services";
import { decodeJWT } from "auth/tokenJWT";

export const getAllArticles = async (req: Request, res: Response) => {
  // const user = decodeJWT(req.cookies.)
  // if(await userService.hasPermission())
  const articles = mapperArticles(await serviceArticles.getArticles());

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
