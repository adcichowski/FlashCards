import { subjectService } from "./subject-service";

import type { Response, Request, NextFunction } from "express";

export const isAvaibleSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subject = req.query.subject;
  if (typeof subject === "string") {
    const hasThisSubject = (await subjectService.getNamesSubjets()).includes(
      subject
    );
    if (!hasThisSubject) res.status(404).send({ message: "Not Found" });
  }
  next();
};
