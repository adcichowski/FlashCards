import { HttpError } from "../utils/error/httpError";

import { authService } from "./auth-service";

import type { validateRegisterSchema } from "./auth-schema";
import type { NextFunction, Request, Response } from "express";
import type { InferType } from "yup";
export const checkUserExist = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const user: InferType<typeof validateRegisterSchema> = req.body;
  const isExistUser = await authService.isUserExist(user);
  if (isExistUser) next(new HttpError(400, "User exist in database!"));

  next();
};
