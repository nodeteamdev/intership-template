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
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        hash: {
            type: String,
        },
    },
    {
        collection: 'usermodel',
        versionKey: false,
    },
);

module.exports = connections.model('UserModel', UserSchema);
