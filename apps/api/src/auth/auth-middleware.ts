import Bcrypt from "bcrypt";

import { HttpError } from "../utils/error/httpError";

import type { validateRegisterSchema } from "./auth-schema";
import type { RegisterUser } from "../user/types";
import type { NextFunction, Request, Response } from "express";
import type { InferType } from "yup";
import { createTokenJWT } from "./tokenJWT";
import { userService } from "user/user-services";

export const checkThePassword = async (
  req: Request<unknown, unknown, RegisterUser>,
  res: Response,
  next: NextFunction
) => {
  const user = await userService.getUser({ email: req.body.email });
  if (!user) return next(new HttpError(401, "Check email and password!"));
  const isCorrectPass = await Bcrypt.compare(req.body.password, user.password);
  if (!isCorrectPass)
    return next(new HttpError(401, "Check email and password!"));
  res.status(200).send({
    userId: user.id,
    token: createTokenJWT({ userId: user.id, role: user.role }),
  });
};

export const checkUserExist = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const user: InferType<typeof validateRegisterSchema> = req.body;
  const userFromDb = await userService.getUser(user);
  if (userFromDb) next(new HttpError(400, "Email or username is used!"));
  next();
};

export const checkAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.cookies, "TUTAJ BĘDĄ LOCALS");
  next();
};
