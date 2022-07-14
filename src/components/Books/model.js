const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const BookSchema = new Schema(
    {
        code3: {
            type: String,
            trim: true,
            required: true,
        },
        title: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
    {
        collection: 'bookmodel',
        versionKey: false,
    },
);

module.exports = connections.model('BookModel', BookSchema);