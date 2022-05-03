import { Router } from "express";
import SwaggerJsdoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";

import { logger } from "./logger";

import type { Request, Response } from "express";

const options: SwaggerJsdoc.Options = {
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
  apis: ["./src/*/*-router.ts", "./src/*/*-schema.ts"],
};

const swaggerSpec = SwaggerJsdoc(options);
const router = Router();

// Swagger page
router.get("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));

// Docs in JSON format
router.get("/docs.json", (_: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

logger.info(`Docs available at http://localhost:${process.env.PORT}/docs`);

export { router as swaggerRouter };
