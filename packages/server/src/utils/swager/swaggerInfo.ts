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
    },
  },
};
