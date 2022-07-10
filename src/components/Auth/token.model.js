const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const UserTokenSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        token: {
            type: String,
        },
    },
    {
        collection: 'tokenmodel',
        versionKey: false,
    },

);

module.exports = connections.model('UserToken', UserTokenSchema);
