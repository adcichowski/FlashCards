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
          userName: true,
        },
      },
    },
  });

const getCardBySubject = async (subject: string) =>
  await prisma.card.findMany({
    where: { Subject: { name: subject } },
    include: {
      Subject: { include: { Section: true } },
      Rate: { include: { User: true } },
      User: {
        select: {
          userName: true,
        },
      },
    },
  });

const getAllCards = async () =>
  await prisma.card.findMany({
    include: {
      Subject: { include: { Section: true } },
      Rate: { include: { User: { select: { userName: true } } } },
      User: {
        select: {
          userName: true,
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
          Shape: { connect: { shapeId: +card.shapeId } },
          Subject: { connect: { id: +card.subjectId } },
          User: { connect: { id: +card.userId } },
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
