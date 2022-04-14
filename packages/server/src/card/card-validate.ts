import Joi from "joi";

import type { Card } from "@prisma/client";
export const validateSchemaCard = Joi.object<Card>({
  question: Joi.string().min(12).max(255).required(),
  answer: Joi.string().min(12).max(255).required(),
  shapeId: Joi.required(),
  userId: Joi.number().required(),
});
