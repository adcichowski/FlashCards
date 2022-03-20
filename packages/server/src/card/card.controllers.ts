import { prisma } from "../../server";
import { Response, Request, NextFunction } from "express";
import { Card, Subject } from "@prisma/client";
import { cardService } from "./card.services";
const scrapCard = ({
  id,
  question,
  Subject,
  answer,
}: Card & {
  Subject: Subject;
}) => ({ id, question, answer, subject: Subject.name });

export const getAllCards = async (_: Request, res: Response) => {
  const allCards = await prisma.card.findMany({
    include: { Subject: true },
  });
  const scrapeData = allCards.map((card) => scrapCard(card));

  res.json(scrapeData);
};

export const getCardById = async (req: Request, res: Response) => {
  res.json(scrapCard(cardService.firstCardById(req.params.id)));
  res.status(404).json("Not Found");
};

export const getCardBySubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subjectName = req.query.subject;
  if (typeof subjectName === "string") {
    const cardBySubject = await prisma.card.findMany({
      where: { Subject: { name: subjectName } },
      include: { Subject: true },
    });
    res.json(cardBySubject.map((card) => scrapCard(card)));
  }
  next();
};
