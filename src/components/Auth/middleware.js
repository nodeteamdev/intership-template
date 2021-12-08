const jwt = require('jsonwebtoken');
const { secret } = require('../../config/env').JWT;

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (authHeader === null) {
    res.status(401).json({ message: 'Token not provided!' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, secret);
    if (payload.type !== 'access') {
      res.status(401).json({ message: 'Invalid token!' });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expired!' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token!' });
    }
  }

  next();
};
