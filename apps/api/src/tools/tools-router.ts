import { setUpTagsFilter } from "articles/articles-tags/articlesTags-middleware";
import { checkAuthUser } from "auth/auth-middleware";
import { Router } from "express";
import { addTool, getAllTools } from "./tools-controllers";
import { reusableValidation } from "utils/reusableValidation";
import { addToolSchema } from "./tools-schema";
import { checkToolExist } from "./tools-middleware";

const router = Router();

router.use(checkAuthUser);

router.get("/tools", setUpTagsFilter, getAllTools);

router.post(
  "/tools",
  reusableValidation(addToolSchema),
  checkToolExist,
  addTool
);

export { router as toolsRouter };
