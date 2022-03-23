import { Response, Request } from "express";
import { logger } from "../utils/logger";
import { subjectService } from "./subject.service";
export const getAllSubject = async (_: Request, res: Response) => {
  logger.info("Getting all subjects from route '/subjects'");
  res.json(await subjectService.getSubjects());
};
