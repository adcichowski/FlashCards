import { Router } from "express";

import { isAvaibleSubject } from "../subject/subject-middleware";
import { reusableValidation } from "../utils/reusableValidation";

import {
  getAllCards,
  getCardById,
  getCardBySubject,
  postCreateCard,
} from "./card-controllers";
import { validateSchemaCard } from "./card-validate";

const router = Router();
router.get("/cards", getAllCards);
router.get("/card", isAvaibleSubject, getCardBySubject);
router.get("/card/:id", getCardById);
router.post("/card", reusableValidation(validateSchemaCard), postCreateCard);
export { router as cardRouter };
