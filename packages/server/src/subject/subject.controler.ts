import { Response, Request } from "express";
import { subjectService } from "./subject.service";
export const getAllSubject = async (_: Request, res: Response) => {
  res.json(await subjectService.getSubjects());
};
