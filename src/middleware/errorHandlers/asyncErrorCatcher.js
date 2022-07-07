/**
 * Handler to catch `async` operation errors.
 * Reduces having to write `try-catch` all the time.
 * {@link https://stackoverflow.com/a/49664174/11666037}.
 */
const asyncErrorCatcher = (action) => (req, res, next) => action(req, res).catch(next);

module.exports = asyncErrorCatcher;
