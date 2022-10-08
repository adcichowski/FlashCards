import { Router } from "express";

import { reusableValidation } from "../utils/reusableValidation";

import { registerUser } from "./auth-controller";
import { checkThePassword } from "./auth-middleware";
import { validateLoginSchema, validateRegisterSchema } from "./auth-schema";

const router = Router();
/**
 * @openapi
 * /sessions:
 *  post:
 *     tags:
 *     - Authentication
 *     consumes:
 *     - application/json
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
router.post(
  "/sessions",
  reusableValidation(validateLoginSchema),
  checkThePassword
);

/**
 * @openapi
 * /sessions:
 *  delete:
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
router.delete("/sessions/:id");

/**
 * @openapi
 * /users:
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
router.post("/users", reusableValidation(validateRegisterSchema), registerUser);

export { router as authRouter };
