const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
  try {
    const authHeader = await req.headers.authorization;
    const token = await authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return res.status(401).json({ message: 'Token isn\'t found' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({ message: 'Not found' });
      }

      req.authData = authData;

      return null;
    });
  } catch (err) {
    res.json({ error: err.fullName });
  }

  return next();
}

module.exports = { verifyToken };
