const BookService = require('./service');

async function getCountPerCountry(_req, res) {
    const resources = await BookService.getAllBooksCountPerCountry();

    res.status(200).json({
        data: resources,
    });
}

async function getNewBooks(_req, res) {
    const LIMIT = 15;
    const resources = await BookService.getNewBooks(LIMIT);

    res.status(200).json({
        data: resources,
    });
}

module.exports = {
    getCountPerCountry,
    getNewBooks,
};
