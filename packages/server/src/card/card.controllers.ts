import { logger } from "../utils/logger";

import { cardService } from "./card.service";

import type { Card, Subject } from "@prisma/client";
import type { Response, Request } from "express";

const scrapCard = ({
  id,
  question,
  Subject,
  answer,
  User,
  shape,
}: Card & {
  readonly Subject: Subject;
  readonly User: {
    readonly userName: string;
  };
}) => ({
  id,
  question,
  answer,
  subjectName: Subject.name,
  subjectColor: Subject.color,
  section: Subject.section,
  createdBy: User.userName,
  shape,
});

export const getAllCards = async (_: Request, res: Response) => {
  const allCards = await cardService.getAllCards();
  logger.info("Getting all cards");

  const scrapeData = allCards.map((card) => scrapCard(card));

  res.json(scrapeData);
};

export const getCardById = async (req: Request, res: Response) => {
  const cardById = await cardService.getFirstCardById(req.params.id);
  if (cardById) {
    logger.info(`Getting Card by ID ${req.params.id}`);
    res.json(scrapCard(cardById));
  }
  res.status(404).send({ message: "Not Found" });
};

export const getCardBySubject = async (req: Request, res: Response) => {
  const subject = req.query.subject;
  if (typeof subject === "string") {
    logger.info(`Getting Card by subject '${subject}'`);
    const cardBySubject = await cardService.getCardBySubject(subject);
    return res.json(cardBySubject.map((card) => scrapCard(card)));
  }
  res.status(404).send({ message: "Not found" });
};
