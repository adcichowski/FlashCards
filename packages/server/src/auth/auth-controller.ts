import { authService } from "./auth-service";

import type { validateRegisterSchema } from "./auth-schema";
import type { Response, Request } from "express";
import type { InferType } from "yup";

export const registerUser = async (req: Request, res: Response) => {
  const user: InferType<typeof validateRegisterSchema> = req.body;
  await authService.createUser(user);
  res.status(201).send({ message: "User is register" });
};
