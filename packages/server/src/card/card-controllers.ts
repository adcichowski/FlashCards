import { logger } from "../utils/logger";

import { cardService, createCard } from "./card-service";

import type { Card, Rate, Subject } from "@prisma/client";
import type { Response, Request } from "express";

const scrapCard = ({
  id,
  question,
  Subject,
  answer,
  User,
  shapeId,
  Rate,
}: Card & {
  readonly Subject: Subject;
  readonly Rate: readonly Rate[];
  readonly User: {
    readonly userName: string;
  };
}) => ({
  id,
  question,
  answer,
  rate: {
    list: Rate.map((userRate) => userRate.rate),
    overall: Rate.reduce((prev, userRate) => {
      return prev + userRate.rate / Rate.length;
    }, 0).toFixed(2),
  },
  subject: {
    name: Subject.name,
    color: Subject.color,
    section: Subject.section,
  },
  createdBy: User.userName,
  shapeId,
});

export const getAllCards = async (_: Request, res: Response) => {
  const allCards = await cardService.getAllCards();
  logger.info("Getting all cards");

  const scrapeData = allCards.map((card) => scrapCard(card));

  res.json(scrapeData);
};

export const getCardById = async (req: Request, res: Response) => {
  if (!/[A-Z]/i.test(req.params.id)) {
    const cardById = await cardService.getFirstCardById(req.params.id);
    if (cardById) {
      logger.info(`Getting Card by ID ${req.params.id}`);
      res.json(scrapCard(cardById));
    }
    res.status(404).send({ message: "Not Found" });
  }
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

export const postCreateCard = (req: Request, res: Response) => {
  const card: Omit<Card, "id"> = req.body;
  console.log(req.body);
  createCard(card);
  res.status(200).send({ message: "Card is created" });
};
