import { Router } from "express";
import { getAllCards, getCardById, getCardBySubject } from "./card.controllers";
const router = Router();
router.get("/cards", getAllCards);
router.get("/card", getCardBySubject);
router.get("/card/:id", getCardById);
export { router as cardRouter };
