const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const chechaCors = require('../middleware/chechaCors');
const clientErrorHandler = require('../middleware/errorHandlers/clientErrorHandler');
const logErrors = require('../middleware/errorHandlers/logErrors');
const errorHandler = require('../middleware/errorHandlers/errorHandler');
const contentTypeChecker = require('../middleware/contentTypeChecker');

module.exports = {
    /**
     * @function
     * @description express middleware
     * @param {express.Application} app
     * @returns void
     */
    init(app) {
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
    errors(app) {
        // displays api friendly error for the clients
        app.use(clientErrorHandler);

        // logs every unhandled error
        app.use(logErrors);

        // handles errors and stops propagation
        app.use(errorHandler);
    },
};
