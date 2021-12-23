const BookModel = require('./model');

/**
 * @exports
 * @method signUp
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function showBooks() {
    return BookModel.aggregate([
        { $group: { _id: '$code3', count: { $sum: 1 } } },
        { $project: { code3: '$_id', _id: 0, value: '$count' } },
    ]);
}

module.exports = {
    showBooks,
};
