import Joi from "joi";

import type { Card } from "@prisma/client";
export const validateSchemaCard = Joi.object<Omit<Card, "id">>({
  question: Joi.string().max(255).required(),
  answer: Joi.string().max(255).required(),
  shapeId: Joi.required(),
  userId: Joi.number().required(),
  subjectId: Joi.required(),
});
