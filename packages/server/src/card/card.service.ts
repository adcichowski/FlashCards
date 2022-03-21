import { prisma } from "../server";

const getFirstCardById = async (id: string) =>
  await prisma.card.findFirst({
    where: { id: +id },
    include: { Subject: true },
  });

const getCardBySubject = async (subject: string) =>
  await prisma.card.findMany({
    where: { Subject: { name: subject } },
    include: { Subject: true },
  });

const getAllCards = async () =>
  await prisma.card.findMany({
    include: { Subject: true },
  });

export const cardService = {
  getFirstCardById,
  getCardBySubject,
  getAllCards,
};
