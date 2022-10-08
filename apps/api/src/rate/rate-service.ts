import { PrismaClient } from "@prisma/client";

import type { validateSchemaRate } from "./rate-schema";
import type { InferType } from "yup";

const prisma = new PrismaClient();
const createRate = ({
  rate,
  userId,
  cardId,
}: InferType<typeof validateSchemaRate>) => {
  return prisma.rate.create({
    data: {
      rate,
      User: { connect: { id: +userId } },
      Card: { connect: { id: cardId } },
    },
  });
};
const updateYourRate = ({ rate }: InferType<typeof validateSchemaRate>) => {
  return prisma.rate.update({
    where: {},
    data: { rate },
  });
};
export const rateService = {
  createRate,
  updateYourRate,
};
