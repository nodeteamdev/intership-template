const BookModel = require('./model');

function countPerCountry() {
    return  BookModel.aggregate([
        { $match: { _id: exists } },
        { $group: { _id: '$code3', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
    ]);
}

function findNewestBooks() {
    const last7days = new Date();
    last7days.setHours(last7days.getHours() - 168);

    return BookModel.aggregate([
        { $match: { createdAt: { $gt: last7days} } },
        { $project: { createdAt: 1, title: '$title', code3: '$code3' } },
    ]);
}

function findAll() {
    return BookModel.find({});
}

function findById(id) {
    return BookModel.findById(id);
}

function create(profile) {
    return BookModel.create(profile);
}

function updateById(profile) {
    return BookModel.updateOne({ _id: profile.id }, profile);
}

function searchByEmail(email) {
    return BookModel.findOne({ email });
}

function deleteById(_id) {
    return BookModel.deleteOne({ _id });
}

module.exports = {
    findAll,
    findById,
    searchByEmail,
    create,
    updateById,
    deleteById,
    countPerCountry,
    findNewestBooks,
};