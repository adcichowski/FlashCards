import { Router } from "express";

// import { isAvaibleSubject } from "../section/sections-middleware";
import { reusableValidation } from "../utils/reusableValidation";

import { getAllCards, getCardById, postCreateCard } from "./cards-controllers";
import { validateSchemaCard } from "./cards-schema";
import { checkAuthUser } from "auth/auth-middleware";

const router = Router();
router.use("/cards", checkAuthUser);

/**
 * @openapi
 * /cards:
 *  get:
 *     operationId: getCards
 *     summary: Get all cards
 *     tags:
 *     - Card
 *     description: Recive cards from database
 *     responses:
 *       200:
 *         description: App is up and running
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetCard'
 *            example:
 *             id: 'cbbdddf7-ad12-46cf-9e7c-c83ec7231ad3'
 *             question: 'What values can we change?'
 *             answer: 'We can easily change let and var, but we should use it less than const'
 *             rates:
 *               list:
 *                 - username: 'Artak'
 *                   rate: '4'
 *                 - username: 'Gelis'
 *                   rate: '2'
 *               overall: 3
 *       400:
 *         description: Problem with server
 */
router.get("/cards", getAllCards);

router.get("/cards/:id", getCardById);

/**
 * @openapi
 * /cards:
 *  post:
 *     operationId: createCard
 *     tags:
 *     - Card
 *     description: Create Card
 *     summary: Create Card
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCard'
 *     responses:
 *       200:
 *         description: Successfully create card
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetCard'
 *            example:
 *             cardId: 'desbdddf7-ad12-46cf-9e7c-c83ec7231ad3'
 *       400:
 *         description: Problem with server
 */
router.post("/cards", reusableValidation(validateSchemaCard), postCreateCard);
export { router as cardRouter };
