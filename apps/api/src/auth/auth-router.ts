import { Router } from "express";

import { reusableValidation } from "../utils/reusableValidation";

import { registerUser } from "./auth-controllers";
import { checkThePassword } from "./auth-middleware";
import { validateLoginSchema, validateRegisterSchema } from "./auth-schema";

const router = Router();

router.post("/auth", reusableValidation(validateLoginSchema), checkThePassword);

/**
 * @openapi
 * /auth/:
 *   post:
 *     summary: Login to get JWT token
 *     tags: [Session]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: uuid
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       401:
 *         description: Invalid credentials
 */
router.post("/users", reusableValidation(validateRegisterSchema), registerUser);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Login to get JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       401:
 *         description: Invalid credentials
 */
export { router as authRouter };
