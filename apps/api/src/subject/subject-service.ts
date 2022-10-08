import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();
const findManySubjects = () => {
  return prisma.subject.findMany({
    include: { Section: true },
  });
};

export const subjectService = { findManySubjects };
