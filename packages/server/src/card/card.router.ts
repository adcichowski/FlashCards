import { Router } from "express";

import { isAvaibleSubject } from "../subject/subject.middleware";

import {
  getAllCards,
  getCardById,
  getCardBySubject,
  postCreateCard,
} from "./card.controllers";
const router = Router();
router.get("/cards", getAllCards);
router.get("/card", isAvaibleSubject, getCardBySubject);
router.get("/card/:id", getCardById);
router.post("/card/add", postCreateCard);
export { router as cardRouter };
