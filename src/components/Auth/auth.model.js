const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const AuthSchema = Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'authusers',
        versionKey: false,
    }
);

module.exports = connections.model('Auth', AuthSchema);
