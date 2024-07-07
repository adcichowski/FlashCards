import type { Response, Request } from "express";
import * as serviceTools from "./tools-service";
// import { InferType } from "yup";
// import { addToolSchema } from "./tools-schema";
// import * as cheerio from "cheerio";
export const getAllTools = async (_req: Request, res: Response) => {
  if (res.locals.user.role === "admin") {
    const articles = await serviceTools.getAllTools({
      page: _req.query.page as string,
      tags: res.locals.tags,
    });
    return res.status(200).json(articles);
  }
  const articles = await serviceTools.getVerifiedTools({
    page: _req.query.page as string,
    tags: res.locals.tags,
  });
  return res.status(200).json(articles);
};

// export const addTool = async (
//   req: Request<{}, {}, InferType<typeof addToolSchema>>,
//   res: Response
// ) => {
//   const articleRes = await fetch(req.body., { method: "GET" });

//   if (!articleRes.ok) {
//     return res.status(404).send({ message: "problem during fetching" });
//   }
//   const text = await articleRes.text();
//   const dom = cheerio.load(text);
//   const { url } = req.body;
//   const host = new URL(url).host;

//   const iconUrl = dom('link[rel*="icon"]') || dom('link[rel*="shortcut icon"]');
//   const generatedArticle = {
//     faviconUrl: iconUrl.attr("href")?.startsWith("/")
//       ? `https://${host}${iconUrl.attr("href")}`
//       : iconUrl.attr("href"),
//     title: dom("title").first().text(),
//     heading: dom("h1").text(),
//     url,
//   };
//   try {
//     const securedArticle = createArticleSchema.validateSync(generatedArticle);
//     const createdArticle = await serviceArticles.createArticle(securedArticle);
//     return res.send(createdArticle);
//   } catch (error) {
//     return res.status(400).send({ message: getErrorMessage(error) });
//   }
// };

// export const deleteArticle = async (
//   req: Request<{ articleId: string }>,
//   res: Response
// ) => {
//   try {
//     await serviceArticles.deleteArticle(req.params.articleId);
//     return res.status(200).send({ message: "correct deleted article" });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({ message: "problem during delete article" });
//   }
// };
