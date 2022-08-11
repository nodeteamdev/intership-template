const { Schema } = require('mongoose');
const mongooseConnection = require('../../config/connection');

const COLLECTION_NAME = 'usermodel';
const MODEL_NAME = 'UserModel';

const schema = new Schema(
    {
        fullName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        collection: COLLECTION_NAME,
        versionKey: false,
    },
);

module.exports = mongooseConnection.model(MODEL_NAME, schema);
