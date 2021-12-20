const express = require('express');
const http = require('http');
const UserRouter = require('../components/User/router');
const AuthRouter = require('../components/Auth/router');
const BookRouter = require('../components/Book/router');

module.exports = {
  /**
   * @function
   * @param {express.Application} app
   * @summary init Application router
   * @returns void
   */
  init(app) {
    const router = express.Router();

    /**
     * Forwards any requests to the /v1/users URI to UserRouter.
     * @name /v1/users
     * @function
     * @inner
     * @param {string} path - Express path
     * @param {callback} middleware - Express middleware.
     */
    app.use('/v1/users', UserRouter);

    /**
     * Forwards any requests to the /v1/auth URI to UserRouter.
     * @name /v1/auth
     * @function
     * @inner
     * @param {string} path - Express path
     * @param {callback} middleware - Express middleware.
     */
    app.use('/v1/auth', AuthRouter);

    /**
     * Forwards any requests to the /v1/auth URI to UserRouter.
     * @name /v1/auth
     * @function
     * @inner
     * @param {string} path - Express path
     * @param {callback} middleware - Express middleware.
     */
    app.use('/v1/books', BookRouter);

    app.use((req, res, next) => {
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
