// /src/app.js
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/authRoute');
const contentRoutes = require('./routes/contentRoute');

const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Learning Management System API',
      version: '1.0.0',
      description: 'API documentation for LMS',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/contents', contentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});