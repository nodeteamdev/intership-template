function errorHandler(err, req, res, next) {
  switch (true) {
  case typeof err === 'string':
    const is404 = err.toLowerCase().endsWith('not found');
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  case err.name === 'ValidationError':
    return res.status(400).json({ message: err.message });
  case err.name === 'UnauthorizedError':
    return res.status(401).json({ message: 'Unauthorized' });
  case err.name === 'TokenExpiredError':
    return res.status(401).json({ message: err.message });
  case err.message === 'A token is required for authentication':
    return res.status(403).json({ message: err.message });
  default:
    return res.status(500).json({ message: err.message });
  }
}
// function errorHandler(err, req, res, next) {
//   res.status(500);
//   res.send(err.message);
//   next();
// }

module.exports = errorHandler;
