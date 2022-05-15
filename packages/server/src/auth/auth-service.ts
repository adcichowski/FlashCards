import { PrismaClient } from "@prisma/client";

import type { validateRegisterSchema } from "./auth-schema";
import type { InferType } from "yup";

const prisma = new PrismaClient();
const createUser = async (user: InferType<typeof validateRegisterSchema>) => {
  return await prisma.user.create({ data: user });
};

const isUserExist = async (user: InferType<typeof validateRegisterSchema>) => {
  return await prisma.user.findFirst({ where: user });
};

export const authService = {
  isUserExist,
  createUser,
};
