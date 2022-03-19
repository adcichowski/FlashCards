import { Router } from "express";
import { getAllCards, getCardById, getCardBySubject } from "./card.controllers";
const router = Router();
router.get("/cards", [getCardBySubject, getAllCards]);
router.get("/card/:id", getCardById);
export { router as cardRouter };
