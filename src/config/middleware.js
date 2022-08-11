"use strict";
exports.__esModule = true;
var body_parser_1 = require("body-parser");
var compression_1 = require("compression");
var cookie_parser_1 = require("cookie-parser");
var cors = require("cors");
var helmet = require("helmet");
var errorHandlers_1 = require("../error/errorHandlers");
exports["default"] = {
    /**
       * @function
       * @description express middleware
       * @param {express.Application} app
       * @returns void
       */
    init: function (app) {
        app.use(body_parser_1["default"].urlencoded({
            extended: false
        }));
        app.use(body_parser_1["default"].json());
        app.use((0, cookie_parser_1["default"])());
        app.use((0, compression_1["default"])());
        app.use(helmet());
        app.use(cors());
        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,'
                + ' Content-Type, Accept,'
                + ' Authorization,'
                + ' Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    },
    errors: function (app) {
        app.use(errorHandlers_1.logErrors);
        app.use(errorHandlers_1.clientErrorHandler);
        app.use(errorHandlers_1.errorHandler);
    }
};
