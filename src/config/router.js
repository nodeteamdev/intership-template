const express = require('express');
const http = require('http');
const UserRouter = require('../components/User/router');
const AuthRouter = require('../components/Auth/router');
const CheckToken = require('../components/Auth/middleware');
const BookRouter = require('../components/Books/router');

module.exports = {
    /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
    init(app) {
        const router = express.Router();

        app.use('/v1/books', BookRouter);
        app.use('/v1/auth', AuthRouter);
        app.use(CheckToken.verifyToken);
        app.use('/v1/users', UserRouter);

        /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        /**
         * @function
         * @inner
         * @param {express.Router}
         */
        app.use(router);
    },
};
