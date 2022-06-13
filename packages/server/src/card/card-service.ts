import { PrismaClient } from "@prisma/client";

import type { validateSchemaCard } from "./card-schema";
import type { InferType } from "yup";

const prisma = new PrismaClient();
const getFirstCardById = async (id: string) =>
  await prisma.card.findFirst({
    where: { id: +id },
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

const getCardBySubject = async (subject: string) =>
  await prisma.card.findMany({
    where: { Subject: { name: subject } },
    include: {
      Standard: { select: { type: true } },
      Rate: { include: { User: true } },
      User: {
        select: {
          username: true,
        },
      },
    },
  });

const getAllCards = async () =>
  await prisma.card.findMany({
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

const createCard = async (card: InferType<typeof validateSchemaCard>) => {
  await prisma.rate.create({
    data: {
      rate: 5,
      Card: {
        create: {
          question: card.question,
          answer: card.answer,
          Shape: { connect: { shape: +card.shape } },
          Subject: { connect: { name: card.subject } },
          User: { connect: { id: +card.userId } },
          Standard: { connect: {} },
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
