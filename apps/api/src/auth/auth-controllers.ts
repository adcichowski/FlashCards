import { HttpError } from "../utils/error/httpError";
import { hashTheValue } from "../utils/utils";

import type { validateRegisterSchema } from "./auth-schema";
import type { Response, Request, NextFunction } from "express";
import type { InferType } from "yup";
import { createTokenJWT } from "./tokenJWT";
import { userService } from "user/user-services";

/**
 * @openapi
 * components:
 *  schemas:
 *   GetToken:
 *    type: object
 *    properties:
 *     userId:
 *      type: string
 *      format: uuid
 *     token:
 *      type: string
 *      format: JWT
 */

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: InferType<typeof validateRegisterSchema> = req.body;
  try {
    const createdUser = await userService.createUser({
      ...user,
      password: await hashTheValue(user.password),
    });
    if (createdUser) {
      const token = createTokenJWT({
        userId: createdUser.id,
        role: createdUser.role,
      });

      res.status(201).send({ userId: createdUser.id, token });
    }
  } catch (error) {
    next(new HttpError(400, "Email or username is used!"));
  }
};
