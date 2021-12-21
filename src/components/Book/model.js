const { Schema } = require('mongoose');
const connections = require('../../config/connection');

/**
 * @schema BookSchema
 * @param {String} title
 * @param {String} desc
 * @param {Date} createdAt
 * @param {Date} updatedAt
 */
const BookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        code3: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'books',
        versionKey: false,
        timestamps: true,
    },
);

module.exports = connections.model('BookModel', BookSchema);
