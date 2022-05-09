import { authService } from "./auth-service";

import type { validateLoginSchema } from "./auth-schema";
import type { Response, Request } from "express";
import type { InferType } from "yup";

export const registerUser = async (req: Request, res: Response) => {
  const user: InferType<typeof validateLoginSchema> = req.body;
  if (user) {
    await authService.createUser(req.body);
    res.status(201).send({ message: "User is register" });
  }
};
