import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getAllArticles,
  editArticle,
} from "./articles-controllers";
import * as yup from "yup";
import {
  blockSecondRate,
  checkAdminAccess,
  checkArticleExist,
  checkArticleExistFromParams,
  checkIsUserRate,
} from "./articles-middleware";
import { reusableValidation, validationParams } from "utils/reusableValidation";
import {
  articleUrlReq,
  createRateArticleSchema,
  editArticleSchema,
  editRateArticleSchema,
} from "./articles-schema";
import {
  changeRateArticle,
  createRateArticle,
  deleteRateArticle,
} from "./articles-rates/articles-rates-controllers";
import { checkAuthUser } from "auth/auth-middleware";
import { setUpTagsFilter } from "./articles-tags/articlesTags-middleware";

const router = Router();
router.use("/articles", checkAuthUser);

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

router.get("/articles", setUpTagsFilter, getAllArticles);

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

router.get(
  "/articles/:articleId",
  validationParams(["articleId"]),
  getArticleById
);

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
  "/articles/:articleId",
  checkAdminAccess,
  reusableValidation(editArticleSchema),
  editArticle
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
  "/articles/:articleId/rates/:rateId",
  validationParams(["articleId", "rateId"]),
  reusableValidation(editRateArticleSchema),
  checkIsUserRate,
  changeRateArticle
);

router.post(
  "/articles/:articleId/rates",
  validationParams(["articleId"]),
  reusableValidation(createRateArticleSchema),
  blockSecondRate,
  createRateArticle
);

router.delete<{ articleId: string }>(
  "/articles/:articleId",
  validationParams(["articleId"]),
  checkAdminAccess,
  deleteArticle
);

router.delete<{ articleId: string; rateId: string }>(
  "/articles/:articleId/rates/:rateId",
  validationParams(["rateId", "articleId"]),
  checkArticleExistFromParams,
  checkIsUserRate,
  deleteRateArticle
);

export { router as articlesRouter };
