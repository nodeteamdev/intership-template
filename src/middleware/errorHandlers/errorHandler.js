const logger = require('../../helpers/logger');

// eslint-disable-next-line no-unused-vars
module.exports = (error, _req, _res, _next) => {
    // TODO: handle some errors
    if (error instanceof TypeError) {
        logger('Use TypeScript!', 'errorHandler middleware', 'warn');
    } else {
        logger('The error was not handled..', 'errorHandler middleware', 'warn');
    }
};
