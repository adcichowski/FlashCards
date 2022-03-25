import { Response, Request, NextFunction } from "express";
import { subjectService } from "./subject.service";

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
