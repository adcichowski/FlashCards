import Jwt from "jsonwebtoken";
import { HttpError } from "utils/error/httpError";
import { hashTheValue } from "utils/utils";

import { authService } from "./auth-service";

import type { validateRegisterSchema } from "./auth-schema";
import type { Response, Request, NextFunction } from "express";
import type { InferType } from "yup";

const MAX_AGE = 24 * 60 * 60;

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: InferType<typeof validateRegisterSchema> = req.body;
  try {
    const createdUser = await authService.createUser({
      ...user,
      password: await hashTheValue(user.password),
    });
    if (createdUser) {
      const token = createTokenJWT(createdUser.id.toString());
      res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE });
      res.status(201).send({ message: "User is register" });
    }
  } catch (error) {
    next(new HttpError(400, "Email is used!"));
  }
};

export const createTokenJWT = (id: string) => {
  const { SECRET_SESSION } = process.env;
  if (!SECRET_SESSION) return new Error("Secret Session is not set!");

  Jwt.sign({ id }, SECRET_SESSION, { expiresIn: MAX_AGE });
};
