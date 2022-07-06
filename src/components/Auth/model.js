const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const TokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 30 * 86400,
        },
    },
    {
        collection: 'TokenSchema',
        versionKey: false,
    },
);

module.exports = connections.model('TokenSchema', TokenSchema);
