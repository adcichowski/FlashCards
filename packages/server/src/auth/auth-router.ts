import { Router } from "express";

import { reusableValidation } from "../utils/reusableValidation";

import { registerUser } from "./auth-controller";
import { checkUserExist } from "./auth-middleware";
import { validateRegisterSchema } from "./auth-schema";

const router = Router();

// router.get("/login", reusableValidation(validateLoginSchema));
/**
 * @openapi
 * /register:
 *  post:
 *     tags:
 *     - Registration
 *     description: Register user to database.
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
