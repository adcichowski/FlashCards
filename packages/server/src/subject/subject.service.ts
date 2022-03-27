import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getSubjects = async () => await prisma.subject.findMany();

const getNamesSubjets = async () => {
  return (await prisma.subject.findMany()).map((subject) => subject.name);
};

export const subjectService = { getSubjects, getNamesSubjets };
