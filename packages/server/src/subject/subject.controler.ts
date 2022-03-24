import { Response, Request, NextFunction } from "express";
import { logger } from "../utils/logger";
import { subjectService } from "./subject.service";
export const getAllSubject = async (_: Request, res: Response) => {
  logger.info("Getting all subjects from route '/subjects'");
  res.json(await subjectService.getSubjects());
};
export const isSubjectAvaible = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subject = req.query.subject;
  if (typeof subject === "string") {
    if (!(await subjectService.getNamesSubjets()).includes(subject)) {
      logger.warn(`Subject ${subject} not exist`);
      return res.status(404).send("404 Not Found");
    }
  }
  next();
};
