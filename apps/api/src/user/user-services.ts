import { roles } from "@prisma/client";
import { prisma } from "../../libs/prisma/constants";
import { RegisterUser } from "user/types";
const hasPermission = async (userId: string, role: keyof typeof roles) => {
  return await prisma.users.findUnique({ where: { id: userId, role } });
};

const createUser = (user: RegisterUser) => {
  return prisma.users.create({ data: user });
};

const getUser = (user: Pick<RegisterUser, "email">) => {
  return prisma.users.findFirst({
    where: { email: user.email },
  });
};

export const userService = { hasPermission, createUser, getUser };
