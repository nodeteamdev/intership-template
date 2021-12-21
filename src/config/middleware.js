const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

module.exports = {
    /**
   * @function
   * @description express middleware
   * @param {express.Application} app
   * @returns void
   */
    init(app) {
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, '../views'));
        app.use(express.urlencoded({
            extended: false,
        }));
        app.use(express.json());
        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        app.use(cookieParser());
        // returns the compression middleware
        app.use(compression());
        // helps you secure your Express apps by setting various HTTP headers
        app.use(helmet({
            hidePoweredBy: true,
        }));
        /* providing a Connect/Express middleware that can
        be used to enable CORS */
        app.use(cors({
            allowedHeaders: ['Origin', 'X-Requested-With', ' Content-Type, Accept',
                'Authorization', 'Access-Control-Allow-Credentials'],
            credentials: true,
        }));
    },
};
