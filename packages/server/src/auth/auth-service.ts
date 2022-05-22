import { PrismaClient } from "@prisma/client";

import { logger } from "../utils/logger";

import type { validateRegisterSchema } from "./auth-schema";
import type { InferType } from "yup";

const prisma = new PrismaClient();
const createUser = async (user: InferType<typeof validateRegisterSchema>) => {
  return await prisma.user.create({ data: user });
};

const getUser = async (
  user: Pick<InferType<typeof validateRegisterSchema>, "email">
) => {
  logger.warn(user, "USER DANE");
  return await prisma.user.findFirst({
    where: { email: user.email },
  });
};

export const authService = {
  getUser,
  createUser,
};
