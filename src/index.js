// Get env path dinamically
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/authenticationController')(app);
require('./app/controllers/userController')(app);

// Handling error responses
const error = require('../src/app/middlewares/error');
error.forEach(errorFunction => {
  app.use(errorFunction[Object.keys(errorFunction)]);
});

module.exports = app.listen(process.env.NODE_ENV === 'TEST' ? 5000 : process.env.PORT || 3000);
