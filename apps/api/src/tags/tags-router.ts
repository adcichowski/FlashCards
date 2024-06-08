import { Router } from "express";
import { checkAuthUser } from "auth/auth-middleware";
import { getTags } from "./tagss-controller";

const router = Router();
router.get("/tags", checkAuthUser, getTags);
export { router as tagsRouter };
