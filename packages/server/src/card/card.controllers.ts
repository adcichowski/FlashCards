import { Response, Request, NextFunction } from "express";
import { Card, Subject } from "@prisma/client";
import { cardService } from "./card.service";
const pino = require("pino-http")();
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
  pino.console.log();

  const scrapeData = allCards.map((card) => scrapCard(card));

  res.json(scrapeData);
};

export const getCardById = async (req: Request, res: Response) => {
  req.log.info("something");
  const cardById = await cardService.getFirstCardById(req.params.id);
  if (cardById) {
    res.json(scrapCard(cardById));
  }
  res.status(404).json("Not Found");
};

export const getCardBySubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subject = req.query.subject;
  if (typeof subject === "string") {
    const cardBySubject = await cardService.getCardBySubject(subject);

    res.json(await cardBySubject.map((card) => scrapCard(card)));
  }
  next();
};
