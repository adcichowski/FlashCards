import type { NextFunction, Request, Response } from "express";

export const setUpTagsFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tags = req.query.tags
    ?.toString()
    .split(",")
    .filter((v) => v);
  res.locals.tags = tags;
  return next();
};
