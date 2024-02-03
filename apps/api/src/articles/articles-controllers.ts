import type { Response, Request } from "express";
import { serviceArticles } from "./articles-service";
export const getAllArticles = async (_req: Request, res: Response) => {
  const articles = await serviceArticles.getArticles();
  res.json(articles);
};
