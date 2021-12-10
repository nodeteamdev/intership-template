const express = require('express');
const middleware = require('../config/middleware');
const routes = require('../config/router');
const { errorsMiddleware } = require('../error/errorsMiddleware');

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
 * @description express.Application Errors Middleware
*/
app.use(errorsMiddleware);

/**
 * @description sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000);

module.exports = app;
