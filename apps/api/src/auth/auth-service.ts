import { v4 } from "uuid";

import type { RegisterUser } from "./types";
import { prisma } from "../../libs/prisma/constants";

const createUser = (user: RegisterUser) => {
  return prisma.users.create({ data: { ...user, id: v4() } });
};

const getUser = (user: Pick<RegisterUser, "email">) => {
  return prisma.users.findFirst({
    where: { email: user.email },
  });
};

export const authService = {
  getUser,
  createUser,
};
