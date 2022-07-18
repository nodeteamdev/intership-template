const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const BooksSchema = new Schema(
    {
        code3: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
            timestamp: true,
        },
        updatedAt: {
            type: Date,
            required: true,
        },
    },
    {
        collection: 'booksmodel',
        versionKey: false,
    },
);

module.exports = connections.model('BooksModel', BooksSchema);
