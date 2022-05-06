import { cardService, createCard } from "./card-service";

import type { Card, Rate, Section, Subject } from "@prisma/client";
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
  readonly Rate: readonly Rate[];
  readonly Subject: Subject & {
    readonly Section: Section;
  };
  readonly User: {
    readonly userName: string;
  };
}) => ({
  id,
  question,
  answer,
  rate: {
    list: Rate.map((userRate) => {
      rate: userRate.rate;
    }),
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
  const card: Omit<Card, "id"> = req.body;
  await createCard(card);
  res.status(200).send({ message: "Card is created" });
};
