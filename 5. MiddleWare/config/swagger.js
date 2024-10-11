const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Management API',
      version: '1.0.0',
      description: 'API to manage books, authors, and categories',
      contact: {
        name: 'Jagat Vasveliyat',
        email: 'jagat.v@brilworks.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/',
      },
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Book ID',
            },
            title: {
              type: 'string',
              description: 'Book title',
            },
            author: {
              type: 'object',
              description: 'Author details',
              $ref: '#/components/schemas/Author',
            },
            category: {
              type: 'object',
              description: 'Category details',
              $ref: '#/components/schemas/Category',
            },
            publicationYear: {
              type: 'integer',
              description: 'Year of publication',
            },
          },
        },
        Author: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Author ID',
            },
            name: {
              type: 'string',
              description: 'Author name',
            },
            biography: {
              type: 'string',
              description: 'Author biography',
            },
          },
          required: ['name', 'biography'],
        },
        Category: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Category ID',
            },
            name: {
              type: 'string',
              description: 'Category name',
            },
            description: {
              type: 'string',
              description: 'Category description',
            },
          },
          required: ['name', 'description'],
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Pointing to your routes for auto-generation
};

const specs = swaggerJSDoc(options);

module.exports = { swaggerUi, specs };
