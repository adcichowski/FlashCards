import { Router } from "express";

import { isAvaibleSubject } from "../subject/subject-middleware";
import { reusableValidation } from "../utils/reusableValidation";

import { getAllCards, getCardById, postCreateCard } from "./card-controllers";
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
router.get("/cards", isAvaibleSubject, getAllCards);

/**
 * @openapi
 * /cards:
 *  get:
 *     tags:
 *     - Cards
 *     description: Recive cards from database
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
router.get("/cards", isAvaibleSubject);

/**
 * @openapi
 * /cards/:id:
 *  get:
 *     tags:
 *     - Cards
 *     description: Recive card from database
 *     responses:
 *       200:
 *         description: App is up and running
 *
 */
router.get("/cards/:id", getCardById);
router.post("/cards", reusableValidation(validateSchemaCard), postCreateCard);
export { router as cardRouter };
