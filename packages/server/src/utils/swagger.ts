import SwaggerJsdoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";

import { logger } from "./logger";

import type { Request, Response, Express } from "express";

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

function swaggerDocs(app: Express, port: string) {
  // Swagger page
  app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (_: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  logger.info(`Docs available at http://localhost:${port}/docs`);
}

export { swaggerDocs };
