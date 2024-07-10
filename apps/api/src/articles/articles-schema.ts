import * as Yup from "yup";

/**
 * @openapi
 * components:
 *   schemas:
 *     Rate:
 *       type: object
 *       properties:
 *         sum:
 *           type: number
 *           description: The total sum of ratings for the article
 *           example: 10
 *     ArticleRate:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user who rated the article
 *           example: "12345"
 *         rate:
 *           type: number
 *           description: The rate given by the user
 *           example: 4
 *     Article:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - url
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the article
 *         title:
 *           type: string
 *           description: The title of the article
 *         description:
 *           type: string
 *           description: A brief description of the article
 *         faviconUrl:
 *           type: string
 *           description: URL to the image of the article
 *         url:
 *           type: string
 *           description: The URL of the article
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *           description: The tags associated with the article
 *         rate:
 *           $ref: '#/components/schemas/Rate'
 *           description: The rating information of the article
 *         yourRated:
 *           $ref: '#/components/schemas/ArticleRate'
 *           description: The user's specific rating of the article
 *       example:
 *         id: 'cbbdddf7-ad12-46cf-9e7c-c83ec7231ad3'
 *         title: 'PostgreSQL'
 *         description: 'The world is most advanced open source database.'
 *         faviconUrl: 'https://www.postgresql.org/media/img/about/press/elephant.png'
 *         url: 'https://www.postgresql.org/'
 *         tags:
 *           - id: 8a8213f9-3dd4-4f1e-a5e4-f59d3229aebe
 *             name: "database"
 *           - id: 34a34fc9-7838-4b0d-afbd-a16b0b748b0e
 *             name: "open source"
 *         rate:
 *           sum: 15
 *         yourRated:
 *           rate: 5
 */

export const createArticleSchema = Yup.object({
  title: Yup.string()
    .label("Title")
    .required(`Provided url don't have title or first heading`),
  faviconUrl: Yup.string().optional().label("Favicon Url"),
  url: Yup.string().required().label("Url"),
  author: Yup.string().optional().label("Author"),
}).required();

export const articleUrlReq = Yup.object({
  url: Yup.string().url().required(),
});

export const editArticleSchema = Yup.object({
  author: Yup.string().optional(),
  tags: Yup.array(
    Yup.object({
      id: Yup.string().required(),
      name: Yup.string().required(),
    }).required()
  ),
});

export const createRateArticleSchema = Yup.object({
  articleId: Yup.string().uuid().required(),
  rate: Yup.number().min(-1).max(1).required(),
});

export const editRateArticleSchema = Yup.object({
  rate: Yup.number().min(-1).max(1).required(),
});
