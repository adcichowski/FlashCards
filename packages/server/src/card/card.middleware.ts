import { subjectService } from "../subject/subject.service";
import { NextFunction, Request, Response } from "express";
export const isAvaibleSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subject = req.query.subject;
  if (typeof subject === "string") {
    const isAvaibleSubject = await (
      await subjectService.getNamesSubjets()
    ).includes(subject);
    console.log(isAvaibleSubject);
    if (!isAvaibleSubject) res.status(404).send({ message: "Not Found" });
  }
  next();
};
