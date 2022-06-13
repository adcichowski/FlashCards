import Jwt from "jsonwebtoken";

import { authService } from "./auth-service";

import type { validateRegisterSchema } from "./auth-schema";
import type { Response, Request } from "express";
import type { InferType } from "yup";

export const registerUser = async (req: Request, res: Response) => {
  const user: InferType<typeof validateRegisterSchema> = req.body;
  const createdUser = await authService.createUser(user);
  if (createdUser) {
    const token = createTokenJWT(createdUser.id.toString());
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(201).send({ message: "User is register" });
  }
};
const MAX_AGE = 24 * 60 * 60;
export const createTokenJWT = (id: string) => {
  const { SECRET_SESSION } = process.env;
  if (!SECRET_SESSION) return new Error("Secret Session is not set!");

  Jwt.sign({ id }, SECRET_SESSION, { expiresIn: MAX_AGE });
};
