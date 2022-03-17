import { Router } from "express";
import { getAllCards, getCardById } from "./card.controllers";
const router = Router();
router.get("/", getAllCards);
router.get("/:id", getCardById);
export { router as cardRouter };
