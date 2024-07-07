import { setUpTagsFilter } from "articles/articles-tags/articlesTags-middleware";
import { checkAuthUser } from "auth/auth-middleware";
import { Router } from "express";
import { getAllTools } from "./tools-controllers";

const router = Router();

router.use(checkAuthUser);

router.get("/tools", setUpTagsFilter, getAllTools);

// router.post(
//   "/tools",
//   reusableValidation(schemaAddTool),
//   checkArticleExist,
//   createArticle
// );

export { router as toolsRouter };
