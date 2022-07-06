const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const UserTokenSchema = new Schema(
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
            expires: 900, // 15 min
        },
    },
);

module.exports = connections.model('UserToken', UserTokenSchema);
