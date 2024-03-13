import Bcrypt from "bcrypt";

import { HttpError } from "../utils/error/httpError";

import {
  validateTokenSchema,
  type validateRegisterSchema,
} from "./auth-schema";
import type { RegisterUser } from "../user/types";
import type { NextFunction, Request, Response } from "express";
import type { InferType } from "yup";
import { createTokenJWT, decodeJWT } from "./tokenJWT";
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
  const token = createTokenJWT({ userId: user.id, role: user.role });
  res.status(200).send({ userId: user.id, token });
};

export const checkUserExist = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const user: InferType<typeof validateRegisterSchema> = req.body;
  const userFromDb = await userService.getUser(user);
  if (userFromDb) return next(new HttpError(400, "Email or username is used!"));
  return next();
};

export const checkAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new HttpError(401, "Token is not sended"));

  try {
    const { userId, role } = decodeJWT(token);
    const userFromDb = await userService.getUserById(userId);
    if (!userFromDb) return next(new HttpError(400, "User not exist"));
    res.locals.user = { id: userId, role };
    return next();
  } catch (error) {
    return next(new HttpError(400, "Invalid token"));
  }
};
