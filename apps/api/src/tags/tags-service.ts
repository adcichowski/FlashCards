import { prisma } from "../../libs/prisma/constants";

export const getTags = () => {
  return prisma.tags.findMany();
};
