import Fs from "fs";
import { resolve } from "path";

import { Router } from "express";
import Yaml from "js-yaml";
import SwaggerJSDoc from "swagger-jsdoc";
import { getEnv } from "utils/utils";

import type { Request, Response } from "express";

const router = Router();

const options: SwaggerJSDoc.OAS3Options = {
  swaggerDefinition: {
    servers: [{ url: `random.local:${getEnv("PORT")}` }],
    openapi: "3.1.0",
    security: [],
    info: {
      license: { name: "MIT", url: "https://www.mit.edu/~amini/LICENSE.md" },
      title: "REST API Docs",
      version: "0.0.1",
    },
  },
  apis: [
    "./src/*/*-router.ts",
    "./src/*/*-controllers.ts",
    "./src/*/*-schema.ts",
  ],
};
const swaggerSpec = SwaggerJSDoc(options);
Fs.writeFileSync("openapi.yaml", Yaml.dump(swaggerSpec));

// Swagger page
router.use("/docs", (_, res) => {
  res.sendFile(resolve("redoc-static.html"));
});
// Docs in JSON format
router.get("/docs.json", (_: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
export { router as routerSwagger };
