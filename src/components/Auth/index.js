const bcrypt = require('bcrypt')

const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const UserService = require('../User/service');
const AuthService = require('./service');
const { HASH_SALT } = require('../../config/dotenvConstants');

async function signUp(req, res, next) {
    try {
        const { error, value } = AuthValidation.signUp(req.body);
        if (error) throw new ValidationError(error.details);
        if (value.email !== value.email.toLowerCase()) throw new ValidationError('Email must be in lowercase');

        const emailIsExist = await UserService.isExistsEmail(value.email);
        const nickNameIsExist = await UserService.isExists_nickName(value.nickName);

        if (emailIsExist === true) throw new Error('email is taken by another user!'); 
        if (nickNameIsExist === true) throw new Error('nickName is taken by another user!');

        const userData = {
            nickName: value.nickName,
            email: value.email,
            password: hashedPassword,
        };

        const registeredUser = await UserService.create(userData);

        res.status(200).json({
            data: {
                message: `${registeredUser.nickName}, you've successfully registered`,
            },
        });  
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });
        return next(error);
    } 

};

async function logIn(req, res, next) {
    try {
        const { error, value } = AuthValidation.logIn(req.body);
        if(error) throw new ValidationError(error.details);

        const existingUser = await UserService.findBy_nickName(value.nickName);
        
        if (existingUser === null) throw new Error('User does not exists!');
        
        if (!AuthService.comparePassword(value.password, existingUser.password)) {
            throw new Error('You entered an invalid password')
        }

        const tokens = AuthService.generateTokens(existingUser);

        await AuthService.updateOrSaveToken(existingUser.id, tokens.refreshToken);


        return res
          .status(200)
          .json({
            tokens,
          });
    } catch(error) {
        if(error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
};

async function refreshToken (req, res, next) {
    try {
        const { error, value } = AuthValidation.Tokens(req.headers);

        if(error) throw new ValidationError(error.details);

        const requestToken = await AuthService.searchToken(value.refreshToken);

        if (requestToken === null) throw new Error('Token is invalid');

        const user = await UserService.findById(requestToken.userId);

        const tokens = generateTokens(user);

        AuthService.updateOrSaveToken(user._id, tokens.refreshToken);

        res
          .status(200)
          .json({
            message: `accessToken Bearer ${tokens.accessToken}`
    });
} catch (error) {
    if (error instanceof ValidationError) {
        return res.status(422).json({
            message: error.name,
            details: error.message,
        });
    } 

    res.status(500).json({
        message: error.name,
        details: error.message,
    });

    return next(error);
   }
}

module.exports = {
    signUp,
    logIn,
    refreshToken,

}