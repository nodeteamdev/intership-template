const UserService = require('../User/service');
const AuthService = require('../Auth/service');
const TokenValidation = require('../Auth/validation');
const ValidationError = require('../../error/ValidationError');

const chatRoom = async (req, res, next) => {
    try {
        const { error, value } = TokenValidation.Token(req.headers);

        if (error) throw new ValidationError(error.details); 

        const token = await AuthService.searchToken(value.authorization.replace('Bearer ', ''));

        const user = await UserService.findById(token.userId);
        
        res.status(200).json({ user_id: value.user_id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    chatRoom,
};