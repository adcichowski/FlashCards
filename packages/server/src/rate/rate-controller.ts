import { rateService } from "./rate-service";

import type { validateSchemaRate } from "./rate-schema";
import type { Response, Request } from "express";
import type { InferType } from "yup";
export const rateCard = async (req: Request, res: Response) => {
  const rate: InferType<typeof validateSchemaRate> = req.body;
  await rateService.createRate(rate);
  res.status(200).send({ message: "Great! You are rated card." });
};
