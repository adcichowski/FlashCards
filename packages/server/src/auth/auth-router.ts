import { Router } from "express";
import { reusableValidation } from "src/utils/reusableValidation";

import { registerUser } from "./auth-controller";
import { checkUserExist } from "./auth-middleware";
import { validateLoginSchema, validateRegisterSchema } from "./auth-schema";

const router = Router();

router.get("/login", reusableValidation(validateLoginSchema));
router.post(
  "/register",
  reusableValidation(validateRegisterSchema),
  checkUserExist,
  registerUser
);
export { router as authRouter };
