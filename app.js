const express = require('express');
const userController = require('./controller/userController');
const transferController = require('./controller/transferController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(express.json());

app.use('/api/users', userController);
app.use('/api/transfers', transferController);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
