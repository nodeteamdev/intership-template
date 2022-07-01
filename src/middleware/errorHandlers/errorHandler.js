module.exports = (error, _req, _res, _next) => {
    // TODO: handle some errors
    if (error instanceof TypeError) {
        console.warn('Use TypeScript!');
    } else {
        console.warn('The error was not handled..');
    }
};
