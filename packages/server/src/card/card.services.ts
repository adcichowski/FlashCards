import { Card, Subject } from "@prisma/client";
import { prisma } from "server";

export const cardService = {
  firstCardById: async (id: string) =>
    await prisma.card.findFirst({
      where: { id: +id },
      include: { Subject: true },
    }),
};
