const logger = require('../../helpers/logger');

module.exports = (error, _req, _res, _next) => {
    // TODO: handle some errors
    if (error instanceof TypeError) {
        logger('Use TypeScript!', 'errorHandler middleware', 'warn');
    } else {
        logger('The error was not handled..', 'errorHandler middleware', 'warn');
    }
};
