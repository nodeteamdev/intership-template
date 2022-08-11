"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var router_1 = require("../components/User/router");
// const AuthRouter = require('../components/Auth/router');
// const BooksRouter = require('../components/Books/router');
// const AuthComponent = require('../components/Auth/index');
exports["default"] = {
    /**
       * @function
       * @param {express.Application} app
       * @summary init Application router
       * @returns void
       */
    init: function (app) {
        var router = express.Router();
        /**
             * Forwards any requests to the /v1/users URI to UserRouter.
             * @name /v1/users
             * @function
             * @inner
             * @param {string} path - Express path
             * @param {callback} middleware - Express middleware.
             */
        // app.use('/v1/users', AuthComponent.verifyAccessToken, UserRouter);
        app.use('/v1/users', router_1["default"]);
        // app.use('/v1/auth', AuthRouter);
        // app.use('/v1/books', BooksRouter);
        /**
             * @description No results returned mean the object is not found
             * @function
             * @inner
             * @param {callback} middleware - Express middleware.
             */
        app.use(function (req, res) {
            res.status(404).send(http.STATUS_CODES[404]);
        });
        /**
             * @function
             * @inner
             * @param {express.Router}
             */
        app.use(router);
    }
};
