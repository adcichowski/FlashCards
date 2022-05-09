import * as Yup from "yup";
export const validateSchemaRate = Yup.object().shape({
  rate: Yup.number().required().max(5).min(1),
  userId: Yup.number().required(),
  cardId: Yup.number().required(),
});

/**
 * @openapi
 * components:
 *  schemas:
 *   CreateRateInput:
 *    type: object
 *    required:
 *     - rate
 *     - userId
 *     - cardId
 *    properties:
 *     rate:
 *      type: number
 *      required: true
 *     userId:
 *      type: number
 *      required: true
 *     cardId:
 *      type: number
 *      required: true
 */
