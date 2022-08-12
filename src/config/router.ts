import express, {
  Request, Response, Router,
} from 'express';
import http from 'http';
import UserRouter from '../components/User/router';

export default {
  /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
  init(app: express.Application) {
    const router = Router();

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
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
    app.use((req: Request, res: Response) => {
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
