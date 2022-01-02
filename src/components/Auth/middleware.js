const jwt = require('jsonwebtoken');
const AuthService = require('./service');
const { TOKENS } = require('../../config/credentials');

module.exports = (req, res, next) => {
  const cookieTokens = req.cookies;

  if (cookieTokens.accessToken !== undefined) {
    const access = cookieTokens.accessToken.replace('Bearer ', '');

    try {
      const payload = jwt.verify(access, TOKENS.access.secret);

      const refresh = AuthService.searchTokenByUserId(payload.userId);

      if (refresh.token === null) {
        return res.render('middleware-messages', { data: { message: 'Invalid token!' } });
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.render('middleware-messages', { data: { message: 'Token expired!' } });
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return res.render('middleware-messages', { data: { message: 'Invalid token!' } });
      }
    }
  } else {
    return res
      .render('middleware-messages', { data: { message: 'Token not provided!' } });
  }
  return next();
};
