function logErrors(err, req, res, next) {
    console.error('logErrors', err.toString());
    next(err);
  }
  
  function clientErrorHandler(err, req, res, next) {
    console.error('clientErrors ', err.toString());
    res.send(500, { error: err.toString()});
    if (req.xhr) {
      console.error(err);
      res.send(500, { error: err.toString()});
    } else {
      next(err);
    }
  }
  
  function errorHandler(err, req, res, next) {
    console.error('lastErrors ', err.toString());
    res.send(500, {error: err.toString()});
  }

module.exports = {
    clientErrorHandler,
    logErrors,
    errorHandler,
};
