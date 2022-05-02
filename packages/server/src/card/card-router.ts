import { Router } from "express";

import { isAvaibleSubject } from "../subject/subject-middleware";
import { reusableValidation } from "../utils/reusableValidation";

import {
  getAllCards,
  getCardById,
  getCardBySubject,
  postCreateCard,
} from "./card-controllers";
import { validateSchemaCard } from "./card-schema";

const router = Router();
/**
 * @openapi
 * /cards:
 *  get:
 *     tags:
 *     - Cards
 *     description: Recive cards from database
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/cards", getAllCards);

router.get("/card", isAvaibleSubject, getCardBySubject);
router.get("/card/:id", getCardById);
router.post("/card", reusableValidation(validateSchemaCard), postCreateCard);
export { router as cardRouter };
