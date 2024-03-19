import * as Yup from "yup";
export const createArticleSchema = Yup.object({
  title: Yup.string().label("Title").required(`Provided url don't have title`),
  imageSrc: Yup.string().optional().label("Image"),
  url: Yup.string().required().label("Url"),
  author: Yup.string().optional(),
}).required();

export const articleUrlReq = Yup.object({
  url: Yup.string().url().required(),
});

export const editArticleSchema = Yup.object({
  imageSrc: Yup.string().optional(),
  author: Yup.string().optional(),
});

export const createRateArticleSchema = Yup.object({
  articleId: Yup.string().uuid().required(),
  rate: Yup.number().min(-1).max(1).required(),
});

export const deleteRateArticleSchema = Yup.object({
  rateId: Yup.string().uuid().required(),
});
