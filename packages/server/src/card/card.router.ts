import { Router } from "express";
import { isSubjectAvaible } from "../subject/subject.controler";
import { getAllCards, getCardById, getCardBySubject } from "./card.controllers";
const router = Router();
router.get("/cards", getAllCards);
router.get("/card", isSubjectAvaible, getCardBySubject);
router.get("/card/:id", getCardById);
export { router as cardRouter };
