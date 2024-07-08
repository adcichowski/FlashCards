import { tooltype } from "@prisma/client";
import * as Yup from "yup";
export const editToolSchema = Yup.object({
  name: Yup.string().label("Name").required(),
  description: Yup.string().optional().label("Github"),
}).required();

export const createToolInDB = Yup.object({
  tags: Yup.array(
    Yup.object({ id: Yup.string().required(), name: Yup.string().required() })
  ),
  type: Yup.mixed<tooltype>()
    .oneOf(["package", "plugin", "program"])
    .required(),
  description: Yup.string().required(),
  icon: Yup.string().url("Icon should be valid URL"),
  url: Yup.string().url("Icon should be valid URL").required(),
  name: Yup.string().required(),
}).required();

export const addToolSchema = Yup.object({
  type: Yup.mixed<tooltype>()
    .oneOf(["package", "plugin", "program"])
    .required(),
  tags: Yup.array(
    Yup.object({ id: Yup.string().required(), name: Yup.string().required() })
  ),
  url: Yup.string().url("Field should be valid URL").required(),
}).required();
