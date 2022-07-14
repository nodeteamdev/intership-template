const BooksService = require('./service');

async function getBooksPerCountry(req, res, next) {
    try {
        const aggregation = await BooksService.getBooksPerCountry();
        res.status(200).json({
            data: aggregation,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: null,
        });

        next(error);
    }
}

async function getNewBooks(req, res, next) {
    try {
        const aggregation = await BooksService.getNewBooks();
        res.status(200).json({
            data: aggregation,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: null,
        });
        
        next(error);
    }
}

module.exports = {
    getBooksPerCountry,
    getNewBooks
};