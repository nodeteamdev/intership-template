const jwt = require('jsonwebtoken');
const AuthService = require('../../components/Auth/service');
const { TOKENS } = require('../dotenvConstants');

module.exports = async function (req, res, next) {
    const accessToken = req.rawHeaders[1].replace('Bearer ', '');
    // console.log(req.headers.authorization);

    try {
        const payload = jwt.verify(accessToken, TOKENS.access.secret);
        const { refreshToken } = await AuthService.findUserData(payload.userId);

        if (refreshToken === null) {
            return res.json({
                from: 'middleware',
                message: 'Invalid token!'
            })
        } 
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.json({
                from: 'middleware',
                message: 'Token expired!'
            })
        } else {
            return res.json({
                from: 'middleware',
                message: 'Token not provided'
            })
        } 
    } 
    return next();
}
