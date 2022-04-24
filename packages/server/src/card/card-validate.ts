import * as Yup from "yup";
export const validateSchemaCard = Yup.object().shape({
  question: Yup.string().max(255).required(),
  answer: Yup.string().max(255).required(),
  shapeId: Yup.string().required(),
  userId: Yup.string().required(),
  subjectId: Yup.number().required(),
});
