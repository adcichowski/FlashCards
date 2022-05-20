import { Router } from "express";
import SwaggerJSDoc from "swagger-jsdoc";
import SwaggerUI from "swagger-ui-express";

import { logger } from "../utils/logger";

import type { Request, Response } from "express";

const router = Router();

const options: SwaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version: "0.0.1",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/*/*-router.ts",
    "./src/*/*-controllers.ts",
    "./src/*/*-schema.ts",
  ],
};
const swaggerSpec = SwaggerJSDoc(options);

// Swagger page
router.use("/docs", SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));

// Docs in JSON format
router.get("/docs.json", (_: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
logger.info(`Docs available at http://localhost:${process.env.PORT}/docs`);
export { router as routerSwagger };
