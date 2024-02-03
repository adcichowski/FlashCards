import { PrismaClient } from "@prisma/client";

import type { validateSchemaCard } from "./cards-schema";
import type { InferType } from "yup";

const prisma = new PrismaClient();
const getFirstCardById = (id: string) =>
  prisma.cards.findFirst({
    where: { id },
    include: {
      Shapes: { select: { shape: true } },
      Subjects: { include: { Sections: true } },
      Rates: { include: { Users: true } },
      Users: {
        select: {
          username: true,
        },
      },
    },
  });

const getCardBySubject = (subject: string) =>
  prisma.cards.findMany({
    where: { Subjects: { id: subject } },
    include: {
      Shapes: { select: { shape: true } },
      Rates: { include: { Users: true } },
      Users: {
        select: {
          username: true,
        },
      },
    },
  });

const getAllCards = () =>
  prisma.cards.findMany({
    include: {
      Shapes: { select: { shape: true } },
      Subjects: { include: { Sections: true } },
      Rates: { include: { Users: { select: { username: true } } } },
      Users: {
        select: {
          username: true,
        },
      },
    },
  });

const createCard = (card: InferType<typeof validateSchemaCard>) => {
  return prisma.rates.create({
    data: {
      rate: 5,
      Cards: {
        create: {
          difficulties: card.difficulties,
          question: card.question,
          answer: card.answer,
          Shapes: { connect: { id: card.shape } },
          Subjects: { connect: { id: card.subject } },
          Users: { connect: { id: card.userId } },
        },
      },
      Users: { connect: { id: card.userId } },
    },
  });
};
export const cardService = {
  getFirstCardById,
  getCardBySubject,
  getAllCards,
  createCard,
};
