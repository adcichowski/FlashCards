import { PrismaClient } from "@prisma/client";

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
      User: {
        select: {
          userName: true,
        },
      },
    },
  });

export const cardService = {
  getFirstCardById,
  getCardBySubject,
  getAllCards,
};
