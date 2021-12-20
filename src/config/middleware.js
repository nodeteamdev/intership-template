const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

module.exports = {
  /**
     * @function
     * @description express middleware
     * @param {express.Application} app
     * @returns void
     */
  init(app) {
    app.use(expressLayouts);
    // layout
    app.use('/assets', express.static(path.join(__dirname, '../assets')));
    app.set('views', path.join(__dirname, '../views/pages'));
    app.set('view engine', 'ejs');
    // ejs
    app.use(express.urlencoded({
      extended: false,
    }));
    app.use(express.json());
    // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use(cookieParser());
    // returns the compression middleware
    app.use(compression());
    // helps you secure your Express apps by setting various HTTP headers
    app.use(helmet());
    // providing a Connect/Express middleware that can be used to enable CORS with various options
    app.use(cors());
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
