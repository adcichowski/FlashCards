import { PrismaClient } from "@prisma/client";

import type { validateSchemaRate } from "./rate-schema";
import type { InferType } from "yup";

const prisma = new PrismaClient();
const createRate = async ({
  rate,
  userId,
  cardId,
}: InferType<typeof validateSchemaRate>) => {
  await prisma.rate.create({
    data: {
      rate,
      User: { connect: { id: +userId } },
      Card: { connect: { id: cardId } },
    },
  });
};
const updateYourRate = async ({
  cardId,
  userId,
  rate,
}: InferType<typeof validateSchemaRate>) => {
  return await prisma.rate.update({
    where: { userId_cardId: { cardId, userId } },
    data: { rate },
  });
};
export const rateService = {
  createRate,
  updateYourRate,
};
