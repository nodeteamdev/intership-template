const { Schema } = require('mongoose');
const mongooseConnection = require('../../config/connection');

const COLLECTION_NAME = 'products';
const MODEL_NAME = 'ProductModel';

const schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        collection: COLLECTION_NAME,
        versionKey: false,
    },
);

module.exports = mongooseConnection.model(MODEL_NAME, schema);
