import Bcrypt from "bcrypt";

import { HttpError } from "../utils/error/httpError";

import { authService } from "./auth-service";

import type {
  validateLoginSchema,
  validateRegisterSchema,
} from "./auth-schema";
import type { NextFunction, Request, Response } from "express";
import type { InferType } from "yup";

export const checkThePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestParams: InferType<typeof validateLoginSchema> = req.body;
  const user = await authService.getUser({ email: requestParams.email });
  if (!user) return next(new HttpError(401, "Check email and password!"));
  const isCorrectPass = await Bcrypt.compare(
    requestParams.password,
    user.password
  );
  if (!isCorrectPass)
    return next(new HttpError(401, "Check email and password!"));
  res.status(200).send({ id: user.id });
};

export const hashThePassword = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const user: InferType<typeof validateRegisterSchema> = req.body;
  const salt = await Bcrypt.genSalt();
  user.password = await Bcrypt.hash(user.password, salt);
  next();
};
export const checkUserExist = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const user: InferType<typeof validateRegisterSchema> = req.body;
  const userFromDb = await authService.getUser(user);
  if (userFromDb) next(new HttpError(400, "User exist in database!"));
  next();
};
