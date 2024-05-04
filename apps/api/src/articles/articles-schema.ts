import * as Yup from "yup";
export const createArticleSchema = Yup.object({
  title: Yup.string()
    .label("Title")
    .required(`Provided url don't have title or first heading`),
  faviconUrl: Yup.string().optional().label("Favicon Url"),
  url: Yup.string().required().label("Url"),
  author: Yup.string().optional().label("Author"),
  heading: Yup.string().optional().label("Heading"),
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

export const editRateArticleSchema = Yup.object({
  rate: Yup.number().min(-1).max(1).required(),
});
