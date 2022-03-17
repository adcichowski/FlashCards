import { prisma } from "../../server";
import { Response, Request } from "express";
import { Card, Subject } from "@prisma/client";
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
  const cardById = await prisma.card.findFirst({
    where: { id: +req.params.id },
    include: { Subject: true },
  });
  if (cardById) {
    res.json(scrapCard(cardById));
  }
  res.status(404).json("Not Found");
};
