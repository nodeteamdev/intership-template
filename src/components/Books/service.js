const BooksModel = require('./model');

function getBooksCountPerCountryService() {
  return BooksModel.aggregate(
    [
      { $group: { _id: '$code3', total: { $sum: 1 } } },
      { $project: { _id: 0, code3: '$_id', value: '$total' } },
      { $limit: 3 },
    ],
  );
}

function getNewBooksService() {
  return BooksModel.aggregate(
    [
      { $group: { _id: '$code3', total: { $sum: 1 } } },
      { $project: { _id: 0, code3: '$_id', value: '$total' } },
      { $sort: { createdAt: -1 } },
      { $limit: 3 },
    ],
  );
}

module.exports = {
  getBooksCountPerCountryService,
  getNewBooksService,
};
