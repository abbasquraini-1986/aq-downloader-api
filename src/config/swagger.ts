import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AQ Media API",
      version: "2.0.0",
      description: "Universal Media Extraction API powered by yt-dlp and Cobalt"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: [
    "./src/routes/*.ts"
  ]
};

export const swaggerSpec = swaggerJSDoc(options);