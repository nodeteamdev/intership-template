const express = require('express');
const middleware = require('../config/middlewares/middleware');
const UserRoutes = require('../config/router');

require('dotenv').config();

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
UserRoutes.init(app); //как читается компилятором эта инициальзация ?

/**
 * @description sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000);

module.exports = app;
