import { subjectService } from "./subject-service";

import type { Response, Request, NextFunction } from "express";

export const isAvaibleSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subject = req.query.subject;
  const subjects = await subjectService.findManySubjects();
  if (typeof subject === "string") {
    const hasThisSubject = subjects
      .map((subject) => subject.name)
      .includes(subject);
    if (!hasThisSubject) res.status(404).send({ message: "Not Found" });
  }
  next();
};
