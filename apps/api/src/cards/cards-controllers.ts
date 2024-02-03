import { cardService } from "./cards-service";

import type { validateSchemaCard } from "./cards-schema";
import type { InferPromise } from "../types/utility";
import type { Response, Request } from "express";
import type { InferType } from "yup";

/**
 * @openapi
 * components:
 *  schemas:
 *   GetCard:
 *    type: object
 *    properties:
 *     question:
 *      type: string
 *     answer:
 *      type: string
 *     shapeId:
 *      type: number
 *      default: 1
 *     createdBy:
 *      type: string
 *     subject:
 *      type: string
 *     section:
 *      type: string
 *     rates:
 *      type: object
 *      properties:
 *       overall:
 *        type: number
 *       list:
 *        type: array
 *        items:
 *         type: object
 *         properties:
 *          username:
 *           type: string
 *          rate:
 *           type: number
 */

const scrapCard = ({
  id,
  question,
  answer,
  Users,
  Shapes: { shape },
  Rates,
  subjectId,
}: InferPromise<(typeof cardService)["getAllCards"]>) => ({
  id,
  question,
  answer,
  rate: {
    list: Rates.map(({ rate, Users }) => ({ rate, ...Users })),
    overall: Rates.reduce((prev, userRate) => {
      return prev + userRate.rate / Rates.length;
    }, 0).toFixed(2),
  },
  subjectId,
  createdBy: Users.username,
  shape,
});

export const getAllCards = async (req: Request, res: Response) => {
  const subject = req.query.subject;
  if (typeof subject === "string") {
    // const cardBySubject = await cardService.getCardBySubject(subject);
    // return res.json(cardBySubject.map((card) => scrapCard(card)));
  }
  const allCards = await cardService.getAllCards();
  const scrapeData = allCards.map((card) => scrapCard(card));

  res.json(scrapeData);
};

export const getCardById = async (req: Request, res: Response) => {
  if (!/[A-Z]/i.test(req.params.id)) {
    const cardById = await cardService.getFirstCardById(req.params.id);
    if (cardById) {
      res.json(scrapCard(cardById));
    }
  }
};

export const postCreateCard = async (req: Request, res: Response) => {
  const card: InferType<typeof validateSchemaCard> = req.body;
  await cardService.createCard(card);
  res.status(200).send({ message: "Card was created" });
};
