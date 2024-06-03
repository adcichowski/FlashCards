import * as yup from "yup";
export const schemaSaveArticle = yup
  .object({
    url: yup.string().url("Field should be valid URL").required(),
  })
  .required();

export const schemaEditArticle = yup.object({
  author: yup.string().optional(),
  title: yup.string().required(),
  titleType: yup.string().oneOf(["title", "heading"]).required(),
  createdAt: yup.number(),
  url: yup.string().url().required(),
  tags: yup.array(yup.string().required()),
});

type x = yup.InferType<typeof schemaEditArticle>;
