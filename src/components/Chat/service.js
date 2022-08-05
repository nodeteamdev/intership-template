const MessageModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all messages
 * @returns Promise<UserModel[]>
 */
function findAll() {
    return MessageModel.find({}).exec();
}

/**
 * @exports
 * @method create
 * @param {object} message
 * @summary create a new message
 * @returns Promise<MessageModel[]>
 */
function create(message) {
    return MessageModel.create(message);
}

/**
 * @exports
 * @method count
 * @param {}
 * @summary return sum of documents
 * @returns Promise<MessageModel[]>
 */
function count() {
    return MessageModel.countDocuments({});
}
module.exports = {
    findAll,
    create,
    count,
};
