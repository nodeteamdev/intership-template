const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const TokenSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        token: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
    },
    {
        collection: 'tokenmodel',
        versionKey: false,
    },
);

module.exports = connections.model('TokenModel', TokenSchema);
