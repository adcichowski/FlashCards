import { prisma } from "../../libs/prisma/constants";

const getSections = () => {
  return prisma.sections.findMany();
};

export const sectionsService = { getSections };
