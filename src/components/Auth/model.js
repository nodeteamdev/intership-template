const { Schema } = require('mongoose');
const connections = require('../../config/connection');

/**
 * @schema TokenSchema
 * @param {String} userId
 * @param {String} token
 */
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
        collection: 'tokens',
        versionKey: false,
    },
);

module.exports = connections.model('TokenModel', TokenSchema);
