"use strict";
exports.__esModule = true;
var express = require("express");
var middleware_1 = require("../config/middleware");
var router_1 = require("../config/router");
/**
 * @type {express}
 * @constant {express.Application}
 */
var app = express();
/**
 * @description express.Application Middleware
 */
middleware_1["default"].init(app);
/**
 * @description express.Application Routes
 */
router_1["default"].init(app);
/**
 * @description express.Application Middleware
 */
middleware_1["default"].errors(app);
/**
 * @description sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000);
exports["default"] = app;
