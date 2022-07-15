const modelBook = require("./model");

function getBooks() {
    return BookModel.aggregate([{$group: {_id: '$code3',total: {$sum: 1,}} }]);
}

function getNewBooks() {
    return BookModel.aggregate([{$sort: {createdAt: -1,}}]);
}

module.exports = {getBooks,getNewBooks};