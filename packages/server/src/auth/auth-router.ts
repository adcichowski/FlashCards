import { Router } from "express";

import { registerUser } from "./auth-controllers";

const router = Router();

router.get("/login");
router.post("/register", registerUser);
export { router as authRouter };
