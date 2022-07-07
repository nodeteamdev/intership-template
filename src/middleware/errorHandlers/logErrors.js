const logger = require('../../helpers/logger');

module.exports = (error, _req, _res, next) => {
    logger(error, 'logErrors middleware', 'error');

    next(error);
};
