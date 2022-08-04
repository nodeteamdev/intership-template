const bcrypt = require('bcrypt');
const connections = require('../../config/connection');
const AuthService = require('../Auth/service');
const { Schema } = require('mongoose');

const UserSchema = new Schema(
    {
        nickName: {
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
        }
    },
    {
        collection: 'usermodel',
        versionKey: false,
    },
).pre('save', async function passwordHashing(next) {
    try {
        const HASH_SALT = await bcrypt.genSalt(3);
        const hash = await bcrypt.hashSync(this.password, HASH_SALT);

        this.password = hash;

        return next();
    } catch (error) { 
        return next(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return AuthService.comparePassword(candidatePassword, this.password);
    } catch (error) {
        return error;
    }
};

module.exports = connections.model('UserModel', UserSchema);
