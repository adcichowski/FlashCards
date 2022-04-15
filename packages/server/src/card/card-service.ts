import { PrismaClient } from "@prisma/client";

import type { Card } from "@prisma/client";

const prisma = new PrismaClient();

const getFirstCardById = async (id: string) =>
  await prisma.card.findFirst({
    where: { id: +id },
    include: {
      Subject: true,
      Rate: true,
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
      Subject: true,
      Rate: true,
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
      Subject: true,
      Rate: true,
      User: {
        select: {
          userName: true,
        },
      },
    },
  });

export const createCard = async (card: Omit<Card, "id">) => {
  await prisma.card.create({
    data: {
      question: card.question,
      answer: card.answer,
      Shape: { connect: { shapeId: +card.shapeId } },
      Subject: { connect: { id: +card.subjectId } },
      User: { connect: { id: +card.userId } },
    },
  });
  return card;
};
export const cardService = {
  getFirstCardById,
  getCardBySubject,
  getAllCards,
};
