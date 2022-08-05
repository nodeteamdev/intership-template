const { Schema } = require('mongoose');
const { ObjectId } = require('mongodb');

const connections = require('../../config/connection');

const MessagesSchema = new Schema(
    {
        body: {
            type: String,
        },
        userId: {
            type: ObjectId,
            required: true,
            ref: 'users',
        },
        fullName: {
            type: String,
        },
    },
    {
        collection: 'messages',
        versionKey: false,
        timestamps: true,
    },
);

module.exports = connections.model('MessageModel', MessagesSchema);
