const express = require('express');
const middleware = require('../config/middleware');
const routes = require('../config/router');
const ErrorHandler = require('../error/ErrorHandler');

/**
 * @type {express}
 * @constant {express.Application}
 */
const app = express();

/**
 * @description express.Application Middleware
 */
middleware.init(app);

/**
 * @description express.Application Routes
 */
routes.init(app);

/**
 * @description express.Application Routes
 */
app.use(ErrorHandler);

/**
 * @description sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000);

module.exports = app;
