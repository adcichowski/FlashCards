import { PrismaClient } from "@prisma/client";

import type { Section, Subject } from "@prisma/client";
const scrapSubject = ({
  name,
  Section,
}: Subject & { readonly Section: Section }) => ({
  name,
  subjectName: Section.name,
});
const prisma = new PrismaClient();
const getSubjects = async () => {
  const subjects = await prisma.subject.findMany({
    include: { Section: true },
  });
  return subjects.map(scrapSubject);
};

const getNamesSubjets = async () => {
  const subjects = await prisma.subject.findMany({
    include: { Section: true },
  });
  return subjects.map(scrapSubject);
};

export const subjectService = { getSubjects, getNamesSubjets };
