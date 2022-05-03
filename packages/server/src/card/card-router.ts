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
 *     - Card
 *     description: Recive cards from database
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/cards", getAllCards);

/**
 * @openapi
 * /card:
 *  get:
 *     tags:
 *     - Card
 *     description: Recive card from database
 *     parameters:
 *      - name: "subject"
 *        in: "query"
 *        description: "Card subject that need to be considered for filter"
 *        type: "array"
 *        items:
 *         type: "string"
 *         enum:
 *          - "available"
 *          - "pending"
 *          - "sold"
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/card", isAvaibleSubject, getCardBySubject);

/**
 * @openapi
 * /card/:id:
 *  get:
 *     tags:
 *     - Card
 *     description: Recive card from database
 *     responses:
 *       200:
 *         description: App is up and running
 *
 */
router.get("/card/:id", getCardById);
router.post("/card", reusableValidation(validateSchemaCard), postCreateCard);
export { router as cardRouter };
