import { Router } from "express";

import { reusableValidation } from "../utils/reusableValidation";

import { registerUser } from "./auth-controller";
import { checkThePassword } from "./auth-middleware";
import { validateLoginSchema, validateRegisterSchema } from "./auth-schema";

const router = Router();

router.post(
  "/sessions",
  reusableValidation(validateLoginSchema),
  checkThePassword
);

router.delete("/sessions/:id");

router.post("/users", reusableValidation(validateRegisterSchema), registerUser);

export { router as authRouter };
