const { verifyAcces } = require('../../components/Auth/service');
const UserService = require('../../components/User/service');
const UnauthorizedError = require('../../error/UnauthorizedError');

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
module.exports = async function isAuthenticated(socket) {
    const BearerToken = socket.handshake.auth.token;
    if (BearerToken) {
        try {
            const [, token] = BearerToken.split(' ');
            const { _id } = verifyAcces(token);
            const {
                email,
                refreshToken,
                fullName,
            } = await UserService.findById(_id);
            if (!refreshToken) throw new UnauthorizedError('Not authorized');

            socket.user = {
                _id, email, fullName,
            };

            return true;
        } catch (error) {
            socket.emit('on-authorized', error);
            return false;
        }
    }
    const error = new UnauthorizedError('Not authorized');
    socket.emit('on-authorized', error);

    return false;
};
