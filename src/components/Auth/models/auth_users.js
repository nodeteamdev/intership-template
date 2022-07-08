const { Schema } = require('mongoose');
const mongooseConnection = require('../../../config/connection');

const COLLECTION_NAME = 'auth_users';
const MODEL_NAME = 'AuthUserModel';

const schema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        collection: COLLECTION_NAME,
        versionKey: false,
    },
);

module.exports = mongooseConnection.model(MODEL_NAME, schema);
