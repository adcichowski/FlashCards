import { Router } from "express";
import { serviceArticles } from "./articles-service";
import { getAllArticles } from "./articles-controllers";
const router = Router();
/**
 * @openapi
 * /cards:
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
router.get("/articles", getAllArticles);

export { router as articlesRouter };
