const { ObjectId } = require('mongodb');
const MessageModel = require('./model');

function create(message) {
    return MessageModel.create(message);
}

function getLastMessages({ skip, limit }) {
    return MessageModel.aggregate(
        [
            {
                $sort: { updatedAt: -1 },
            },
            {
                $skip: Number(skip),
            },
            {
                $limit: Number(limit),
            },
        ],
    );
}
function getAllUsersId(userId, { skip, limit }) {
    return MessageModel.aggregate([
        {
            $match: { userId: { $ne: new ObjectId(userId) } },
        },
        {
            $group: { _id: '$userId' },
        },
        {
            $skip: Number(skip),
        },
        {
            $limit: Number(limit),
        },
    ]);
}

module.exports = { create, getLastMessages, getAllUsersId };
