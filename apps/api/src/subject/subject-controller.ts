import { subjectService } from "./subject-service";

import type { Section, Subject } from "@prisma/client";
import type { Response, Request } from "express";

const scrapSubject = ({
  id,
  Section,
}: Subject & { readonly Section: Section }) => ({
  id,
  section: Section.name,
});

export const getAllSubjects = async (_: Request, res: Response) => {
  const allSubjects = await subjectService.findManySubjects();
  return res.json(allSubjects.map(scrapSubject));
};
