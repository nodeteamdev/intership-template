const { Schema } = require('mongoose');
const mongooseConnection = require('../../config/connection');

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
    },
    {
        collection: 'usermodel',
        versionKey: false,
    },
);

module.exports = mongooseConnection.model('UserModel', UserSchema);
