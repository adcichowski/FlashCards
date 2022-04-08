import { Router } from "express";
import SwaggerJSDoc from "swagger-jsdoc";
import SwaggerUI from "swagger-ui-express";

const router = Router();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for FlashCards",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  layout: "StandaloneLayout",
  apis: ["./src/*/*.router.ts"],
};
const swaggerSpec = SwaggerJSDoc(options);

router.use("/", SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));
export { router as routerSwagger };
