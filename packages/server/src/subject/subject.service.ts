import { prisma } from "../server";

export const subjectService = {
  getSubjects: async () => await prisma.subject.findMany(),
};
