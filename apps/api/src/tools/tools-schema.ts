import { tooltype } from "@prisma/client";
import * as Yup from "yup";
export const editToolSchema = Yup.object({
  name: Yup.string().label("Name").required(),
  description: Yup.string().optional().label("Github"),
}).required();

/**
 * @openapi
 * components:
 *   schemas:
 *     Tool:
 *       type: object
 *       description: Represents a tool with its details
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the tool
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the tool
 *         description:
 *           type: string
 *           description: A brief description of the tool
 *         url:
 *           type: string
 *           format: uri
 *           description: The URL associated with the tool
 *         type:
 *           type: string
 *           enum: [package, program, plugin]
 *           description: The type of the tool
 *         icon:
 *           type: string
 *           format: uri
 *           description: The URL of the tool's icon
 *         tags:
 *           type: array
 *           description: List of tags associated with the tool
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *       example:
 *         name: ReactJS DevTools
 *         id: 550e8400-e29b-41d4-a716-446655440000
 *         description: A powerful developer tool for debugging React applications
 *         url: https://reactjs.org/tutorial/tutorial.html
 *         type: plugin
 *         icon: https://example.com/icons/react-devtools.png
 *         tags:
 *           - id: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
 *             name: react
 *           - id: 85f520d0-193c-4499-a496-7f4f1b93d130
 *             name: debugging
 *
 *     Tag:
 *       type: object
 *       description: Represents a tag used for categorizing tools
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the tag
 *         name:
 *           type: string
 *           description: The name of the tag
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         name: javascript
 */
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
