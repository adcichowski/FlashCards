import { prisma } from "../server";

export const subjectService = {
  getSubjects: async () => await prisma.subject.findMany(),
  getNamesSubjets: async () => {
    return await (
      await prisma.subject.findMany()
    ).map((subject) => subject.name);
  },
};
