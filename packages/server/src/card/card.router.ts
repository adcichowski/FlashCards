import { Router } from "express";
import { getAllCards, getCardById, getCardBySubject } from "./card.controllers";
import { isAvaibleSubject } from "./card.middleware";
const router = Router();
router.get("/cards", getAllCards);
router.get("/card", isAvaibleSubject, getCardBySubject);
router.get("/card/:id", getCardById);
export { router as cardRouter };
