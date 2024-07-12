import type { Response, Request } from "express";
import * as serviceTools from "./tools-service";
import { InferType, ValidationError } from "yup";
import { addToolSchema, createToolInDB, editToolSchema } from "./tools-schema";
import * as cheerio from "cheerio";
import { getErrorMessage } from "utils/error/errorValidation";
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

export const addTool = async (
  req: Request<{}, {}, InferType<typeof addToolSchema>>,
  res: Response
) => {
  const toolRes = await fetch(req.body.url, { method: "GET" });

  if (!toolRes.ok) {
    return res.status(404).send({ message: "problem during fetching" });
  }
  const text = await toolRes.text();
  const dom = cheerio.load(text);
  const { url } = req.body;
  const host = new URL(url).host;

  const iconUrl = dom('link[rel*="icon"]') || dom('link[rel*="shortcut icon"]');
  const generatedTool = {
    icon: iconUrl.attr("href")?.startsWith("/")
      ? `https://${host}${iconUrl.attr("href")}`
      : iconUrl.attr("href"),
    name:
      dom('meta[property="og:site_name"]').attr("content") ||
      dom('meta[property="og:title"]').attr("content") ||
      dom("title").first().text(),
    url,
    tags: req.body.tags,
    type: req.body.type,
    description: dom('meta[name="description"]').attr("content"),
  };
  try {
    const securedTool = createToolInDB.validateSync(generatedTool);
    const createdArticle = await serviceTools.createTool(securedTool);
    return res.send(createdArticle);
  } catch (error) {
    return res.status(400).send({ message: getErrorMessage(error) });
  }
};

export const editTool = async (
  req: Request<{ toolId: string }>,
  res: Response
) => {
  try {
    const securedArticle = editToolSchema.validateSync(req.body);
    await serviceTools.editTool({
      toolId: req.params.toolId,
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
