import * as yup from "yup";
export const schemaSaveArticle = yup
  .object({
    url: yup.string().url("Field should be valid URL").required(),
  })
  .required();

export const schemaEditArticle = yup
  .object({
    author: yup.string().optional(),
    title: yup.string().required(),
    tags: yup.array(yup.object({ id: yup.string().required(), name: yup.string().required() })),
  })
  .required();
