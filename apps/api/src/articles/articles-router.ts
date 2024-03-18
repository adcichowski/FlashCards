import { Router } from "express";
import * as cheerio from "cheerio";
import { createArticle, getAllArticles } from "./articles-controllers";
import { checkArticleExist, checkIsUserRate } from "./articles-middleware";
import { reusableValidation } from "utils/reusableValidation";
import { articleUrlReq, deleteRateArticleSchema } from "./articles-schema";
import {
  createRateArticle,
  deleteRateArticle,
} from "./articles-rates/articles-rates-controllers";
const router = Router();
/**
 * @openapi
 * /articles:
 *  get:
 *     operationId: getArticle
 *     summary: Get articles
 *     tags:
 *     - Articles
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
 *  post:
 *     operationId: createArticle
 *     summary: Create article
 *     tags:
 *     - Articles
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

/**
 * @openapi
 * /articles/{articleId}:
 *  put:
 *     operationId: editArticle
 *     summary: Edit article
 *     parameters:
 *       - in: path
 *         name: articleId
 *         schema:
 *           type: uuid
 *         required: true
 *     tags:
 *     - Articles
 *     description: Edit article field
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *            example:
 *             id: 'cbbdddf7-ad12-46cf-9e7c-c83ec7231ad3'
 *       400:
 *         description: Problem with server
 */

router.put(
  "/articles",
  reusableValidation(articleUrlReq),
  checkArticleExist,
  createArticle
);

router.post("/articles/:articleId/rates", createRateArticle);

router.delete(
  "/articles/:articleId/rates",
  reusableValidation(deleteRateArticleSchema),
  checkIsUserRate,
  deleteRateArticle
);

export { router as articlesRouter };
