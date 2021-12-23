// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
const BookService = require('./service');
// const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
// const userModel = require('../User/model');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function signUp(req, res, next) {
    try {
        // const { error } = AuthValidation.create(req.body);

        // if (error) {
        //     throw new ValidationError(error.details);
        // }

        const books = await BookService.showBooks();

        // return res.status(200).json({
        //     data: user,
        // });
        return res.status(200).json({
            data: books,
            message: 'Das ist gut',
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
};
