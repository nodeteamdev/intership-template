const { Schema } = require('mongoose');
const connections = require('../../config/connection');

/**
 * @schema UserSchema
 * @param {String} fullName
 * @param {String} email
 * @param {String} password
 * @param {String} role
 */
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
        role: {
            type: String,
            default: 'User',
            required: true,
        },
        lastVisitBooks: {
            type: Date,
            default: Date.now,
            required: true,
        },
    },
    {
        collection: 'users',
        versionKey: false,
    },
);

module.exports = connections.model('UserModel', UserSchema);
