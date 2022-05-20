import * as Yup from "yup";
export const validateSchemaCard = Yup.object().shape({
  question: Yup.string().max(255).required(),
  answer: Yup.string().max(255).required(),
  shapeId: Yup.string().required(),
  userId: Yup.string().required(),
  subjectId: Yup.number().required(),
});

/**
 * @openapi
 * components:
 *  schemas:
 *   CreateCardInput:
 *    type: object
 *    required:
 *     - question
 *     - answer
 *     - shapeId
 *     - userId
 *     - subjectId
 *     - rate
 *    properties:
 *     question:
 *      type: string
 *     answer:
 *      type: string
 *     shapeId:
 *      type: number
 *      default: 1
 *     userId:
 *      type: number
 *     subjectId:
 *      type: number
 *     rate:
 *      type: object
 *      readOnly: true
 *      properties:
 *        userId:
 *              type: number
 *        rate:
 *            type: number
 */
