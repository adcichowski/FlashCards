import { Router } from "express";

import { reusableValidation } from "../utils/reusableValidation";

import { registerUser } from "./auth-controller";
import { checkUserExist } from "./auth-middleware";
import { validateLoginSchema, validateRegisterSchema } from "./auth-schema";

const router = Router();
/**
 * @openapi
 * /login:
 *  post:
 *     tags:
 *     - Authentication
 *     description: Register user to database.
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Card object that needs to be added to the store"
 *       required: true
 *       schema:
 *         $ref: "#/components/schemas/Login"
 *     responses:
 *       200:
 *         description: App is up and running
 *       401:
 *         description: User is exist in database
 */
router.post("/login", reusableValidation(validateLoginSchema));

/**
 * @openapi
 * /register:
 *  post:
 *     tags:
 *     - Authentication
 *     description: Register user to database.
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Card object that needs to be added to the store"
 *       required: true
 *       schema:
 *         $ref: "#/components/schemas/Register"
 *     responses:
 *       200:
 *         description: App is up and running
 *       401:
 *         description: User is exist in database
 */
router.post(
  "/register",
  reusableValidation(validateRegisterSchema),
  checkUserExist,
  registerUser
);
export { router as authRouter };
