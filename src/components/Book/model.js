const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const BookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'bookmodel',
        versionKey: false,
    },
);

module.exports = connections.model('BookModel', BookSchema);
