import { PrismaClient } from "@prisma/client";

import type { validateSchemaCard } from "./card-schema";
import type { InferType } from "yup";

const prisma = new PrismaClient();
const getFirstCardById = (id: string) =>
  prisma.card.findFirst({
    where: { id: Number(id) },
    include: {
      Subject: { include: { Section: true } },
      Rate: { include: { User: true } },
      User: {
        select: {
          username: true,
        },
      },
    },
  });

const getCardBySubject = (subject: string) =>
  prisma.card.findMany({
    where: { Subject: { id: subject } },
    include: {
      Rate: { include: { User: true } },
      User: {
        select: {
          username: true,
        },
      },
    },
  });

const getAllCards = () =>
  prisma.card.findMany({
    include: {
      Subject: { include: { Section: true } },
      Rate: { include: { User: { select: { username: true } } } },
      User: {
        select: {
          username: true,
        },
      },
    },
  });

const createCard = (card: InferType<typeof validateSchemaCard>) => {
  return prisma.rate.create({
    data: {
      rate: 5,
      Card: {
        create: {
          difficulties: card.difficulties,
          question: card.question,
          answer: card.answer,
          Shape: { connect: { id: Number(card.shape) } },
          Subject: { connect: { id: card.subject } },
          User: { connect: { id: Number(card.userId) } },
        },
      },
      User: { connect: { id: +card.userId } },
    },
  });
};
export const cardService = {
  getFirstCardById,
  getCardBySubject,
  getAllCards,
  createCard,
};
