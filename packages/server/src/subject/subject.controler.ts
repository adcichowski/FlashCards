import { prisma } from "../../server";
import { Response, Request } from "express";
export const getAllSubject = async (_: Request, res: Response) => {
  const allSubject = await prisma.subject.findMany();
  res.json(allSubject);
};
