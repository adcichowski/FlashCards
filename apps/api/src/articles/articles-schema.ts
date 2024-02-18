import * as Yup from "yup";
export const createArticleSchema = Yup.object({
  title: Yup.string().label("Title").required(`Provided url don't have title`),
  imageSrc: Yup.string().optional().label("Image"),
  url: Yup.string().required().label("Url"),
  author: Yup.string().optional(),
}).required();

export const articleUrlReq = Yup.object().shape({
  url: Yup.string().url().required(),
});

export const editArticleSchema = Yup.object({
  title: Yup.string().label("Title").required(`Provided url don't have title`),
  imageSrc: Yup.string()
    .required(`Provided url don't have meta og:img`)
    .label("Image"),
});
