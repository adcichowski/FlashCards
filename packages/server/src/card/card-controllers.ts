import { cardService } from "./card-service";

import type { InferPromise } from "../types/utility";
import type { validateSchemaCard } from "./card-schema";
import type { Response, Request } from "express";
import type { InferType } from "yup";
const scrapCard = ({
  id,
  question,
  Subject,
  answer,
  User,
  shapeId,
  Rate,
}: InferPromise<typeof cardService["getAllCards"]>) => ({
  id,
  question,
  answer,
  rate: {
    list: Rate.map(({ rate, User }) => ({ rate, ...User })),
    overall: Rate.reduce((prev, userRate) => {
      return prev + userRate.rate / Rate.length;
    }, 0).toFixed(2),
  },
  section: Subject.Section.name,
  subject: Subject.name,
  createdBy: User.userName,
  shapeId,
});

export const getAllCards = async (req: Request, res: Response) => {
  const subject = req.query.subject;
  if (typeof subject === "string") {
    const cardBySubject = await cardService.getCardBySubject(subject);
    return res.json(cardBySubject.map((card) => scrapCard(card)));
  }
  const allCards = await cardService.getAllCards();
  const scrapeData = allCards.map((card) => scrapCard(card));

  res.json(scrapeData);
};

export const getCardById = async (req: Request, res: Response) => {
  if (!/[A-Z]/i.test(req.params.id)) {
    const cardById = await cardService.getFirstCardById(req.params.id);
    if (cardById) {
      res.json(scrapCard(cardById));
    }
  }
};

export const postCreateCard = async (req: Request, res: Response) => {
  const card: InferType<typeof validateSchemaCard> = req.body;
  await cardService.createCard(card);
  res.status(200).send({ message: "Card was created" });
};
