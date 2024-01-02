import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import { logger } from "../utils/logger";

import type { RegisterUser } from "./types";

const prisma = new PrismaClient();

const createUser = (user: RegisterUser) => {
  return prisma.user.create({ data: { ...user, id: v4() } });
};

const getUser = (user: Pick<RegisterUser, "email">) => {
  logger.warn(user, "USER DANE");
  return prisma.user.findFirst({
    where: { email: user.email },
  });
};

export const authService = {
  getUser,
  createUser,
};
