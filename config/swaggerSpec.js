import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'A simple Express API application documented with Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

// Swagger options
const swaggerJsdocOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
export const swaggerSpec = swaggerJsdoc(swaggerJsdocOptions);
