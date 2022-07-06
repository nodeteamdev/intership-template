function logErrors(err, req, res, next) {
  console.error('custom error');
  console.error(err.stack);
  next(err);
}

module.exports = logErrors;
