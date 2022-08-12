import express from 'express';
import http from 'http';
import AuthRouter from '../components/Auth/router';
import UserRouter from '../components/User/router';
import ProductRouter from '../components/Product/router';
import BookRouter from '../components/Book/router';
import isAuthUser from '../middleware/isAuthUser';

export default {
    /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
    init(app: express.Application) {
        const router = express.Router();

        /**
         * Forwards any requests to the /v1/auth URI to AuthRouter.
         * @name /v1/users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        router.use('/v1/auth', AuthRouter);

        /**
         * Forwards any requests to the /v1/users URI to UserRouter.
         * @name /v1/users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        router.use('/v1/users', UserRouter);

        /**
         * Forwards any requests to the /v1/products URI to ProductRouter.
         * @name /v1/products
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        router.use('/v1/products', isAuthUser, ProductRouter);

        /**
         * Forwards any requests to the /v1/books URI to BookRouter.
         * @name /v1/books
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        router.use('/v1/books', BookRouter);

        /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        router.use((_req, res) => {
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
