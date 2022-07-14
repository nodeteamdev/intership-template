const BookService = require('./service');

async function getCountryBooksController(req, res, next) {
    try {
        const books = await BookService.getCountryBooksService();

        return res.status(200).json({
            books,
        });
    } catch (error) {
        return next(error);
    }
}

async function getNewBooksController(req, res, next) {
    try {
        const books = await BookService.getNewBooks();

        return res.status(200).json({
            books,
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getCountryBooksController,
    getNewBooksController,
};
