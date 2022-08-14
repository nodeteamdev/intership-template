import express from 'express';
import * as http from 'http';
import UserRouter from '../components/User/router';
import AuthRouter from '../components/Auth/router';
// const BooksRouter = require('../components/Books/router');
// const AuthComponent = require('../components/Auth/index');

export default {
  /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
  init(app: express.Application) {
    const router: express.Router = express.Router();

    /**
         * Forwards any requests to the /v1/users URI to UserRouter.
         * @name /v1/users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
    // app.use('/v1/users', AuthComponent.verifyAccessToken, UserRouter);
    app.use('/v1/users', UserRouter);
    app.use('/v1/auth', AuthRouter);
    // app.use('/v1/books', BooksRouter);

    /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
    app.use((req: express.Request, res: express.Response) => {
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
