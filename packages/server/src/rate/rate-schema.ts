import * as Yup from "yup";
export const validateSchemaRate = Yup.object().shape({
  rate: Yup.number().required(),
  userId: Yup.string().required(),
  cardId: Yup.number().required(),
});

/**
 * @openapi
 * components:
 *  schemas:
 *   Rate:
 *    type: object
 *    required:
 *     - rate
 *     - userId
 *     - cardId
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
 *            type: 5
 */
