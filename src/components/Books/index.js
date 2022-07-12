const BooksModel = require('./model');

async function getBooksCountPerCountry(req, res, next) {
  try {
    const books = await BooksModel.aggregate(
      [
        { $group: { _id: '$code3', total: { $sum: 1 } } },
        { $project: { _id: 0, code3: '$_id', value: '$total' } },
        { $limit: 3 },
      ],
    );

    res.status(200).send(books);
  } catch (error) {
    next(error);
  }
}

async function getNewBooks(req, res, next) {
  try {
    const books = await BooksModel.aggregate(
      [
        { $group: { _id: '$code3', total: { $sum: 1 } } },
        { $project: { _id: 0, code3: '$_id', value: '$total' } },
        { $sort: { createdAt: -1 } },
        { $limit: 3 },
      ],
    );

    res.status(200).send(books);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBooksCountPerCountry,
  getNewBooks,
};
