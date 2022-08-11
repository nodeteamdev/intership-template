import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import chechaCors from '../middleware/chechaCors';
import clientErrorHandler from '../middleware/errorHandlers/clientErrorHandler';
import logErrors from '../middleware/errorHandlers/logErrors';
import errorHandler from '../middleware/errorHandlers/errorHandler';
import contentTypeChecker from '../middleware/contentTypeChecker';

export default {
    /**
     * @function
     * @description express middleware
     * @param {express.Application} app
     * @returns void
     */
    init(app: express.Application) {
        app.use(bodyParser.urlencoded({
            extended: false,
        }));
        app.use(bodyParser.json());
        // content-type checker
        app.use(contentTypeChecker);

        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        app.use(cookieParser());
        // returns the compression middleware
        app.use(compression());
        // helps you secure your Express apps by setting various HTTP headers
        app.use(helmet());
        // providing a Connect/Express middleware that can be used
        // to enable CORS with various options
        app.use(cors());
        // cors
        app.use(chechaCors);
    },

    /**
     * @function
     * @description express middleware for errors
     * @param {express.Application} app
     * @returns void
     */
    errors(app: express.Application) {
        // displays api friendly error for the clients
        app.use(clientErrorHandler);

        // logs every unhandled error
        app.use(logErrors);

        // handles errors and stops propagation
        app.use(errorHandler);
    },
};
