const express = require('express');
const UserRouter = require('../components/User/router');
const AuthRouter = require('../components/Auth/router');
const BookRouter = require('../components/Book/router');
const ChatRouter = require('../components/Chat/router');
const PagesRouter = require('../components/Pages/router');

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
     * @name
     * @function
     * @inner
     * @param {string} path - Express path
     * @param {callback} middleware - Express middleware.
     */
    app.use('/', PagesRouter);

    /**
     * Forwards any requests to the /v1/auth URI to UserRouter.
     * @name /auth
     * @function
     * @inner
     * @param {string} path - Express path
     * @param {callback} middleware - Express middleware.
     */
    app.use('/auth', AuthRouter);

    /**
     * Forwards any requests to the /v1/auth URI to UserRouter.
     * @name /v1/books
     * @function
     * @inner
     * @param {string} path - Express path
     * @param {callback} middleware - Express middleware.
     */
    app.use('/v1/books', BookRouter);

    app.use('/', ChatRouter);

    /**
     * Wrong route
     */
    app.use((req, res, next) => {
      try {
        res.status(404).render('error', { data: { message: 'Page not found' } });
      } catch (error) {
        next(error);
      }
    });

    /**
         * @function
         * @inner
         * @param {express.Router}
         */
    app.use(router);
  },
};
