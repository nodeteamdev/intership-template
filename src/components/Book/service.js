const BookModel = require('./book.model');
const UserModel = require('../User/models/userModel');

async function addBooks(csvData) {
  BookModel.book.insertMany(csvData).then(() => {
    console.log('Data inserted successfully');
  }).catch((err) => {
    throw new Error(err);
  });
}

async function countPerCountry() {
  const aggregate = await BookModel.book.aggregate([
    {
      $group: {
        _id: '$code3',
        code3: { $first: '$code3' },
        value: { $sum: 1 },
      },
    },
    {
      $sort: { value: -1 },
    },
    {
      $project: { _id: 0 },
    },
  ]);
  return aggregate;
}

async function searchByCode(userId, code3) {
  const user = await UserModel.user.findById({ _id: userId });
  if (!user) {
    throw new Error('User not found');
  }
  const aggregate = await BookModel.book.aggregate([
    {
      $match: {
        code3,
      },
    },
  ]);
  for (let i = 0; i < aggregate.length; i++) {
    if (user.viewedBooks.find((item) => item.title === aggregate[i].title)) {
      console.log('Duplicated book');
    } else {
      user.addViewedBooks(aggregate[i]);
    }
  }
  await user.save();
  return aggregate;
}

async function newBooks(userId) {
  const user = await UserModel.user.findById({ _id: userId });
  let books = await BookModel.book.find({});
  if (!user) {
    throw new Error('User not found');
  }
  for (let i = 0; i < user.viewedBooks.length; i++) {
    if (books.find((item) => item.title === user.viewedBooks[i].title)) {
      books = books.filter((item) => item.title !== user.viewedBooks[i].title);
    }
  }
  return books;
}

module.exports = {
  addBooks,
  countPerCountry,
  searchByCode,
  newBooks,
};
