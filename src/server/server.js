const express = require('express');
const middleware = require('../config/middleware');
const routes = require('../config/router');
const error = require('../error/errorClass');

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
 * @description express.Application ErrorHandlers
 */
app.use(error.logErrors);
app.use(error.clientErrorHandler);
app.use(error.errorHandler);

/**
 * @description sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000);

module.exports = app;
