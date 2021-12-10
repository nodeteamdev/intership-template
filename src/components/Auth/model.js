const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const TokenSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        token: {
            type: String,
            trim: true,
            required: true,
        },
    },
    {
        collection: 'tokenmodel',
        versionKey: false,
    },
);

module.exports = connections.model('TokenModel', TokenSchema);
