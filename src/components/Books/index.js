const BooksService = require('./service');

async function countPerCountry(req, res, next) {
    try {
        const result = await BooksService.countPerCountry();
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
}

async function getNewBooks(req, res, next) {
    try {
        const result = await BooksService.getNewBooks();
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    countPerCountry,
    getNewBooks,
};
