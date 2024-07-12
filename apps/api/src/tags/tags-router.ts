import { Router } from "express";
import { checkAuthUser } from "auth/auth-middleware";
import { getTags } from "./tagss-controller";

const router = Router();

/**
 * @openapi
 * /tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tags:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tag'
 *
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       description: Represents a tag used for categorizing content
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         name: javascript
 */

router.get("/tags", checkAuthUser, getTags);
export { router as tagsRouter };
