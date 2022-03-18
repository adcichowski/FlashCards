import { Router } from "express";
import { getAllCards, getCardById, getCardBySubject } from "./card.controllers";
const router = Router();
router.get("/", [getCardBySubject, getAllCards]);
router.get("/:id", getCardById);
export { router as cardRouter };
