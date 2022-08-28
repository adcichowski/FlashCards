import { PrismaClient } from "@prisma/client";

import { logger } from "../utils/logger";

import type { validateRegisterSchema } from "./auth-schema";
import type { InferType } from "yup";

const prisma = new PrismaClient();
const createUser = (user: InferType<typeof validateRegisterSchema>) => {
  return prisma.user.create({ data: user });
};

const getUser = (
  user: Pick<InferType<typeof validateRegisterSchema>, "email">
) => {
  logger.warn(user, "USER DANE");
  return prisma.user.findFirst({
    where: { email: user.email },
  });
};

export const authService = {
  getUser,
  createUser,
};
