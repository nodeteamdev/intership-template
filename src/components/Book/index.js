const http = require('http');
const BookService = require('./service');
const BookValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const AuthError = require('../../error/AuthError');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res) {
    const books = await BookService.findAll();

    res.status(200).json({
        data: books,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findByTitle(req, res) {
    const { value, error } = BookValidation.checkTitle(req.params);

    if (error) {
        throw new ValidationError(error.details);
    }

    const book = await BookService.findByTitle(value.title);
    if (book !== null) {
        return res.status(200).json({
            data: book,
        });
    }

    return res.status(404).json({
        data: 'Not found',
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res) {
    const { value, error } = BookValidation.create(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    const book = await BookService.create(value);

    return res.status(200).json({
        data: book,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateByTitle(req, res) {
    const { value, error } = BookValidation.updateByTitle(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    const updatedBook = await BookService.updateByTitle(value);

    return res.status(200).json({
        data: updatedBook,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res) {
    const { value, error } = BookValidation.checkId(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    if (req.user.role === 'Admin') {
        const deletedBook = await BookService.deleteById(value.id);

        return res.status(200).json({
            data: deletedBook,
        });
    }
    throw new AuthError(http.STATUS_CODES[403], 403);
}

module.exports = {
    findAll,
    findByTitle,
    create,
    updateByTitle,
    deleteById,
};
