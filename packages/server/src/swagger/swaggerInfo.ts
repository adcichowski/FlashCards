import { version } from "server/package.json";
export const swaggerInfo = {
  openapi: "3.0.1",
  info: {
    title: "Express API for FlashCards",
    version,
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
  },

  servers: [
    {
      url: "http://localhost:3001",
      description: "Development server",
    },
  ],
  paths: {
    "/subjects": {
      get: {
        tags: ["Subjects"],
        summary: "Find Subjects in FlashCards",
        responses: {
          "200": {
            description: "successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Subject",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/card": {
      post: {
        tags: ["Card"],
        summay: "Create Card in FlashCards",
      },
      consumes: ["application/json"],
      responses: {
        "200": {
          description: "successful operation",
          content: {
            "application/json": {
              message: "Card was created",
            },
          },
        },
      },
    },
    "/cards": {
      get: {
        tags: ["Card"],
        summary: "Find All Cards in FlashCards",
        responses: {
          "200": {
            description: "successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Card",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Subject: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int64" },
          name: { type: "string" },
          color: { type: "string" },
          section: { type: "string" },
        },
      },
      Card: {
        type: "object",
        properties: {
          id: { type: "number", format: "integer" },
          question: { type: "string" },
          answer: { type: "string" },
          subject: {
            type: "object",
            properties: {
              name: { type: "string" },
              color: { type: "string" },
              section: { type: "string" },
            },
          },
          rate: {
            type: "object",
            properties: {
              list: { type: "array", items: { type: "integer" } },
              overall: { type: "number", format: "float" },
            },
          },
          createdBy: { type: "string" },
          shapeId: { type: "integer", format: "int64" },
        },
      },
    },
  },
};
