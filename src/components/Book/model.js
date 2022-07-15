const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const BookSchema = new Schema(
    {
        code3: {
            type: String,
            required: true,
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
        collection: 'bookmodel',
        timestamps: true,
        versionKey: false,
    },
);

module.exports = connections.model('BookModel', BookSchema);