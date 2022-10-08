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
 *     summary: Get cards
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
 *       400:
 *         description: "Invalid Subject supplied"
 *       404:
 *         description: "Cards not found"
 */
router.get("/cards", isAvaibleSubject);

/**
 * @openapi
 * /cards/{cardId}:
 *  get:
 *     tags:
 *     - Cards
 *     summary: Find card by ID
 *     description: Return a single card
 *     parameters:
 *     - name: cardId
 *       in: path
 *       description: ID of card to return
 *       required: true
 *       type: integer
 *       format: int64
 *     responses:
 *       200:
 *         description: Return list cards
 *         content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetCard'
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Card not found
 *
 */
router.get("/cards/:id", getCardById);

/**
 * @openapi
 * /cards:
 *  post:
 *    tags:
 *    - Cards
 *    summary: Create card
 *    consumes:
 *    - "application/x-www-form-urlencoded"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "Card object that needs to be added to the store"
 *      required: true
 *      schema:
 *        $ref: "#/components/schemas/CreateCardInput"
 */
router.post("/cards", reusableValidation(validateSchemaCard), postCreateCard);
export { router as cardRouter };
