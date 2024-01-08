import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

import type { RegisterUser } from "./types";

const prisma = new PrismaClient();

const createUser = (user: RegisterUser) => {
  return prisma.user.create({ data: { ...user, id: v4() } });
};

const getUser = (user: Pick<RegisterUser, "email">) => {
  return prisma.user.findFirst({
    where: { email: user.email },
  });
};

export const authService = {
  getUser,
  createUser,
};
