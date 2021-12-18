const jwt = require('jsonwebtoken');
const { tokens } = require('../../config/credentials').JWT;

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (authHeader !== undefined) {
    const token = authHeader.replace('Bearer ', '');
    try {
      const payload = jwt.verify(token, tokens.access.secret);
      if (payload.userId !== req.body.userId) {
        console.log(payload);
        res.render('middleware-messages', { data: { message: 'Invalid token!' } });
        return;
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.render('middleware-messages', { data: { message: 'Token expired!' } });
        return;
      }
      if (error instanceof jwt.JsonWebTokenError) {
        res.render('middleware-messages', { data: { message: 'Invalid token!' } });
        return;
      }
    }
  } else {
    res.render('middleware-messages', { data: { message: 'Token not provided!' } });
    return;
  }
  next();
};
