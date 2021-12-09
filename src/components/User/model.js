const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const UserSchema = new Schema(
    {
        fullName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        accessToken: {
            type: String,
            required: false,
        },
    },
    {
        collection: 'usermodel',
        versionKey: false,
    },
);

module.exports = connections.model('UserModel', UserSchema);
