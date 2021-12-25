module.exports = (err, req, res, next) => {
  console.error(err);

  if (res.headerSent) {
    return next(err);
  }

  if (err.name === 'E_MISSING_OR_INVALID_PARAMS') {
    res.status(422).json({
      message: err.name,
      details: err.message,
    });
  } else if (err.name === 'Error') {
    res.status(411).json({
      message: err.name,
      details: err.message,
    });
  } else {
    res.status(500).json({
      message: err.name,
      details: err.message,
    });
  }
  return next();
};
