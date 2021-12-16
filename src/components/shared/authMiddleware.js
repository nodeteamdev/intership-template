const { checkToken } = require('../Auth/validation');

const authMiddleware = (err, req) => {
    req.user = checkToken(req.cookies.accessToken);
};

module.exports = authMiddleware;
