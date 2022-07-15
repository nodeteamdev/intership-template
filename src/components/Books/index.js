const { getBooksCountPerCountryService, getNewBooksService } = require('./service');

async function getBooksCountPerCountry(req, res, next) {
  try {
    const books = await getBooksCountPerCountryService();
    res.status(200).send(books);
  } catch (error) {
    next(error);
  }
}

async function getNewBooks(req, res, next) {
  try {
    const books = await getNewBooksService();
    res.status(200).send(books);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBooksCountPerCountry,
  getNewBooks,
};
