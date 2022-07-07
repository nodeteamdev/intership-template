const { Schema } = require('mongoose');
const mongooseConnection = require('../../config/connection');

const AuthUserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        collection: 'auth_users',
        versionKey: false,
    },
);
const AuthUserModel = mongooseConnection.model('AuthUserModel', AuthUserSchema);

const RefreshTokenSchema = new Schema(
    {
        authUserId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        collection: 'refresh_tokens',
        versionKey: false,
    },
);
const RefreshTokenModel = mongooseConnection.model('RefreshTokenModel', RefreshTokenSchema);

module.exports = {
    AuthUserModel,
    RefreshTokenModel,
};
