const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const BooksSchema = new Schema(
    {
        code3: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
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

module.exports = connections.model('BooksSchema', BooksSchema);
