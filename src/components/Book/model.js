const { Schema } = require('mongoose');
const mongooseConnection = require('../../config/connection');

const COLLECTION_NAME = 'books';
const MODEL_NAME = 'BookModel';

const schema = new Schema(
    {
        code3: {
            // country code
            type: String,
            trim: true,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
        versionKey: false,
    },
);

module.exports = mongooseConnection.model(MODEL_NAME, schema);
