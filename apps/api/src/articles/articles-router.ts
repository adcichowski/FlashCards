import { Router } from "express";
import * as cheerio from "cheerio";
import { createArticle, getAllArticles } from "./articles-controllers";
import { checkArticleExist } from "./articles-middleware";
import { reusableValidation } from "utils/reusableValidation";
import { articleUrlReq } from "./articles-schema";
const router = Router();
/**
 * @openapi
 * /articles:
 *  get:
 *     operationId: getArticle
 *     summary: Get all articles
 *     tags:
 *     - Card
 *     description: Response article from database
 *     responses:
 *       200:
 *         description: App is up and running
 *         content:
 *           application/json:
 *            example:
 *             id: 'cbbdddf7-ad12-46cf-9e7c-c83ec7231ad3'
 *             title: 'PostgreSQL'
 *             description: 'The worlds most advanced open source database.'
 *             imageSrc: 'https://www.postgresql.org/media/img/about/press/elephant.png'
 *             url: 'https://www.postgresql.org/'
 *       400:
 *         description: Problem with server
 */
// router.get("/articles", getAllArticles);

router.get("/articles", getAllArticles);

/**
 * @openapi
 * /articles:
 *  get:
 *     operationId: createArticle
 *     summary: Create article
 *     tags:
 *     - Article
 *     description: Create article based on meta tags
 *     responses:
 *       200:
 *         description: Create article
 *         content:
 *           application/json:
 *            example:
 *             id: 'cbbdddf7-ad12-46cf-9e7c-c83ec7231ad3'
 *       400:
 *         description: Problem with server
 */

router.post(
  "/articles",
  reusableValidation(articleUrlReq),
  checkArticleExist,
  createArticle
);

export { router as articlesRouter };
