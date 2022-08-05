const UserService = require('../User/service');
const AuthService = require('../Auth/service');
const AuthValidation = require('../Auth/validation');
const ValidationError = require('../../error/ValidationError');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
const getChat = async (req, res, next) => {
    try {
        const { error, value } = AuthValidation.refresh(req.cookies);

        if (error) {
            throw new ValidationError(error.details);
        }
        const token = await AuthService.findToken(value.refresh_token);

        const user = await UserService.findById(token.userId);
        res
            .status(200)
            .render('chat', {
                user_name: user.fullName,
                user_id: user.id,
            });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getChat,
};
