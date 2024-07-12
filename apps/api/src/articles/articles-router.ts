import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getAllArticles,
  editArticle,
} from "./articles-controllers";
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

router.use(checkAuthUser);

router.get("/articles", setUpTagsFilter, getAllArticles);

/**
 * @openapi
 * /articles:
 *   get:
 *     summary: Retrieve a list of articles
 *     tags:
 *     - Articles
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *             examples:
 *               example1:
 *                 summary: Example article
 *                 value:
 *                   id: '1'
 *                   title: 'PostgreSQL'
 *                   description: 'An open-source relational database.'
 *                   faviconUrl: 'https://www.postgresql.org/media/img/about/press/elephant.png'
 *                   url: 'https://www.postgresql.org/'
 *                   tags:
 *                     - id: 1
 *                       name: "database"
 *                     - id: 2
 *                       name: "open source"
 */

router.get(
  "/articles/:articleId",
  validationParams(["articleId"]),
  getArticleById
);

/**
 * @openapi
 * /articles/{id}:
 *   get:
 *     summary: Retrieve a single article by ID
 *     tags:
 *     - Articles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The article ID
 *     responses:
 *       200:
 *         description: A single article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
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
 *   put:
 *     summary: Edit tags for a specific article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to edit tags for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of tag IDs. Empty array removes all tags. New tags will be added, existing tags will remain.
 *     responses:
 *       200:
 *         description: Tags successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 article:
 *                   $ref: '#/components/schemas/Article'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Article not found
 *       401:
 *         description: Unauthorized - User is not authenticated
 *
 * security:
 *   - bearerAuth: []
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
/**
 * @openapi
 * /articles/{articleId}:
 *   delete:
 *     summary: Delete a specific article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to delete
 *     responses:
 *       204:
 *         description: Article successfully deleted
 *       404:
 *         description: Article not found
 *       403:
 *         description: Forbidden - User doesn't have permission to delete this article
 *       401:
 *         description: Unauthorized - User is not authenticated
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 */

router.delete<{ articleId: string; rateId: string }>(
  "/articles/:articleId/rates/:rateId",
  validationParams(["rateId", "articleId"]),
  checkArticleExistFromParams,
  checkIsUserRate,
  deleteRateArticle
);

export { router as articlesRouter };
