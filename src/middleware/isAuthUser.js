const jwtFacade = require('../components/Auth/jwt.facade');
const AuthService = require('../components/Auth/service');
const AuthError = require('../error/AuthError');

module.exports = async (req, _res, next) => {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');
    const payload = await jwtFacade.getPayloadFromJWT(accessToken);
    if (
        payload === null
        || payload.tokenType !== jwtFacade.tokenTypes.access
        || !payload.authUserId
    ) {
        return next(new AuthError());
    }
    // NOTE: not required in the example, I guess
    const authUser = await AuthService.getAuthUserById(payload.authUserId);
    if (authUser === null) {
        return next(new AuthError());
    }
    req.authUser = authUser;

    return next();
};
