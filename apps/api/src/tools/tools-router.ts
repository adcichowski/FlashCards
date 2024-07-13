import { setUpTagsFilter } from "articles/articles-tags/articlesTags-middleware";
import { checkAuthUser } from "auth/auth-middleware";
import { Router } from "express";
import {
  addTool,
  editTool,
  getAllTools,
  getToolById,
} from "./tools-controllers";
import { reusableValidation } from "utils/reusableValidation";
import { addToolSchema, editToolSchema } from "./tools-schema";
import { checkToolExist } from "./tools-middleware";
import { checkAdminAccess } from "articles/articles-middleware";

const router = Router();

router.use(checkAuthUser);

/**
 * @openapi
 * /tools:
 *   get:
 *     summary: Get all tools
 *     tags: [Tools]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tools:
 *                   type: array
 *                   description: A list of all available tools
 *                   items:
 *                     $ref: '#/components/schemas/Tool'
 */
router.get("/tools", setUpTagsFilter, getAllTools);

router.post(
  "/tools",
  reusableValidation(addToolSchema),
  checkToolExist,
  addTool
);

router.put<{ toolId: string }>(
  "/tools/:toolId",
  checkAdminAccess,
  reusableValidation(editToolSchema),
  editTool
);

/**
 * @openapi
 * /tools/{toolId}:
 *   put:
 *     summary: Edit details for a specific tool
 *     tags: [Tools]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
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
 *         description: Tool not found
 *       401:
 *         description: Unauthorized - User is not authenticated
 *
 * security:
 *   - bearerAuth: []
 */

router.get<{ toolId: string }>(
  "/tools/:toolId",
  reusableValidation(editToolSchema),
  getToolById
);

export { router as toolsRouter };
