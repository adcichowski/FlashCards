import { Router } from "express";
import SwaggerJSDoc from "swagger-jsdoc";
import SwaggerUI from "swagger-ui-express";

import { swaggerInfo } from "./swaggerInfo";
const router = Router();

const options = {
  swaggerDefinition: swaggerInfo,
  layout: "StandaloneLayout",
  apis: ["./swaggerInfo.yaml"],
};
const swaggerSpec = SwaggerJSDoc(options);

router.use("/", SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));
export { router as routerSwagger };
