import * as Yup from "yup";
export const editToolSchema = Yup.object({
  name: Yup.string().label("Name").required(),
  github: Yup.string().optional().label("Github"),
  npm: Yup.string().optional().label("Npm"),
  description: Yup.string().optional().label("Github"),
  stars: Yup.number().required().label("Stars"),
}).required();

export const addToolSchema = Yup.object({
  tags: Yup.array(
    Yup.object({ id: Yup.string().required(), name: Yup.string().required() })
  ),
  url: Yup.string().url("Field should be valid URL").required(),
}).required();
