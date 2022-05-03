import { HttpError } from "../utils/error/httpError";
import { HttpStatusCode } from "../utils/error/httpStatusCodes";

import { subjectService } from "./subject-service";

import type { Response, Request, NextFunction } from "express";

export const isAvaibleSubject = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const subject = req.query.subject;
  const subjects = await subjectService.findManySubjects();
  if (typeof subject === "string") {
    const hasThisSubject = subjects
      .map((subject) => subject.name)
      .includes(subject);
    if (!hasThisSubject) {
      next(new HttpError(HttpStatusCode.NotFound, "Subject not exist!"));
    }
  }
  next();
};
