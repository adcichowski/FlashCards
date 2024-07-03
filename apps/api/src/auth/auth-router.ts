import { Router } from "express";

import { reusableValidation } from "../utils/reusableValidation";

import { registerUser } from "./auth-controllers";
import { checkThePassword } from "./auth-middleware";
import { validateLoginSchema, validateRegisterSchema } from "./auth-schema";

const router = Router();

/**
 * @openapi
 * /auth:
 *  post:
 *     operationId: loginTo
 *     summary: Get token
 *     tags:
 *     - Session
 *     description: Get new token in login
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Login'
 *       400:
 *         description: Problem with server
 */

router.post("/auth", reusableValidation(validateLoginSchema), checkThePassword);

router.post("/users", reusableValidation(validateRegisterSchema), registerUser);

export { router as authRouter };
