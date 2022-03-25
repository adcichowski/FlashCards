import { Response, Request } from "express";
import { Card, Subject } from "@prisma/client";
import { cardService } from "./card.service";
import { logger } from "../utils/logger";
const scrapCard = ({
  id,
  question,
  Subject,
  answer,
}: Card & {
  Subject: Subject;
}) => ({ id, question, answer, subject: Subject.name });

export const getAllCards = async (_: Request, res: Response) => {
  const allCards = await cardService.getAllCards();
  logger.info("Getting all cards");

  const scrapeData = allCards.map((card) => scrapCard(card));

  res.json(scrapeData);
};

export const getCardById = async (req: Request, res: Response) => {
  const cardById = await cardService.getFirstCardById(req.params.id);
  logger.info(`Getting Card by ID ${req.params.id}`);
  if (cardById) {
    res.json(scrapCard(cardById));
  }
  res.status(404).send({ message: "Not Found" });
};

export const getCardBySubject = async (req: Request, res: Response) => {
  const subject = req.query.subject;
  logger.info(`Getting Card by subject '${subject}'`);
  if (typeof subject === "string") {
    const cardBySubject = await cardService.getCardBySubject(subject);
    return res.json(await cardBySubject.map((card) => scrapCard(card)));
  }
  res.status(404).send({ message: "Not found" });
};
