import * as yup from "yup";
export const schemaAddTool = yup
  .object({
    tags: yup.array(yup.object({ id: yup.string().required(), name: yup.string().required() })).label("Tags"),
    url: yup.string().url("Field should be valid URL").required().label("Url"),
    type: yup.string().oneOf(["program", "plugin", "package"]).required().label("Type"),
  })
  .required();

export const optionsTypeTools = ["program", "package", "plugin"];
export const schemaEditTool = yup
  .object({
    type: yup.object().shape({
      name: yup.string().required(),
      value: yup.string().required(),
    }).optional(),
    name: yup.string().required(),
    tags: yup.array(yup.object({ id: yup.string().required(), name: yup.string().required() })),
  })
  .required();
