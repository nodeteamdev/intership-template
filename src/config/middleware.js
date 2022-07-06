const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const ejs = require('ejs');
const express = require('express');
const helmet = require('helmet');
const logErrors = require('../error/logErrors');
const clientErrorHandler = require('../error/clientErrorHandler');
const errorHandler = require('../error/errorHandler');

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
        app.set('views', `${__dirname}/../views`);
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        app.use(cookieParser());
        // returns the compression middleware
        app.use(compression());
        // helps you secure your Express apps by setting various HTTP headers
        app.use(helmet());
        // providing a Connect/Express middleware that can be used to enable CORS with various options
        app.use(cors());
        app.use(logErrors);
        app.use(clientErrorHandler);
        app.use(errorHandler);
        // cors
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,'
                + ' Content-Type, Accept,'
                + ' Authorization,'
                + ' Access-Control-Allow-Credentials',
            );
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    },
};
