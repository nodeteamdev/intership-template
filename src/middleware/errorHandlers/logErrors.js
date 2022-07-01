const TAKE_N_FIRST_FROM_STACK = 2;

module.exports = (error, _req, _res, next) => {
    const errorStackAsArray = error.stack.split('\n');
    const stackString = errorStackAsArray
        .splice(0, Math.min(TAKE_N_FIRST_FROM_STACK, errorStackAsArray.length))
        .join('\n');
    console.error(stackString);

    next(error);
};
