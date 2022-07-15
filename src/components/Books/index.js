const BooksService = require('./service');
const BooksValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const NotFoundError = require('../../error/NotFoundError');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res) {
    const { error, value } = BooksValidation.findAll(req.query);

    if (error) {
        throw new ValidationError(error.details);
    }

    const books = await BooksService.findAll(value);

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
async function findById(req, res) {
    const { error, value } = BooksValidation.findById(req.params);

    if (error) {
        throw new ValidationError(error.details);
    }

    const book = await BooksService.findById(value.id);
    if (!book) throw new NotFoundError('book not found');

    return res.status(200).json({
        data: book,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getGroupedByCountry(req, res) {
    const { error, value } = BooksValidation.getGroupedByCountry(req.query);

    if (error) {
        throw new ValidationError(error.details);
    }
    const books = await BooksService.getGroupedByCountry(value);

    return res.status(200).json({ data: books });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getNewBooks(req, res) {
    const { error, value } = BooksValidation.getNewBooks(req.query);

    if (error) {
        throw new ValidationError(error.details);
    }
    const books = await BooksService.getNewBooks(value);

    return res.status(200).json({ data: books });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res) {
    const { error, value } = BooksValidation.create(req.body);

    if (error) {
        throw new ValidationError(error.details);
    }

    const book = await BooksService.create(value);

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
async function updateById(req, res) {
    const value = BooksValidation.updateById(req.body);

    // if (error) {
    //     throw new ValidationError(error.details);
    // }

    const { _id } = value;
    const updatedBook = await BooksService.updateById(_id, value);
    if (!updatedBook.modifiedCount) throw new NotFoundError('book not found');

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
    const { error, value } = BooksValidation.findById(req.params);

    if (error) {
        throw new ValidationError(error.details);
    }

    const { _id } = value;
    const deletedBook = await BooksService.deleteById(_id);

    if (!deletedBook.deletedCount) throw new NotFoundError('book not found');

    return res.status(200).json({
        data: deletedBook,
    });
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    getGroupedByCountry,
    getNewBooks,
};
