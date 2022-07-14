const csvtojson = require('csvtojson');
const BookService = require('./service');

async function addBooks(req, res, next) {
  try {
    csvtojson()
      .fromFile('books.csv')
      .then((csvData) => {
        const result = BookService.addBooks(csvData);
        res.status(200).send({
          message: result,
        });
      });
  } catch (error) {
    next(error);
  }
}

async function countPerCountry(req, res, next) {
  try {
    const result = await BookService.countPerCountry();
    res.status(200).send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function searchByCode(req, res, next) {
  try {
    const {
      id, code3,
    } = req.params;
    const result = await BookService.searchByCode(id, code3);
    res.status(200).send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function newBooks(req, res, next) {
  try {
    const {
      id,
    } = req.params;
    const result = await BookService.newBooks(id);
    res.status(200).send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addBooks,
  countPerCountry,
  searchByCode,
  newBooks,
};
