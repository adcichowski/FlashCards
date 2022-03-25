import { prisma } from "../server";

const getSubjects = async () => await prisma.subject.findMany();

const getNamesSubjets = async () => {
  return await (await prisma.subject.findMany()).map((subject) => subject.name);
};

export const subjectService = { getSubjects, getNamesSubjets };
