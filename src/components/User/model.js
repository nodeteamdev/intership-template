const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');
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
        refreshToken: String,
    },
    {
        collection: 'users',
        versionKey: false,
        tymestamp: true,
    },
).pre('save', async function passwordHashing(next) {
    try {
        const user = this;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        return next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.comparePassword = async function passwordCheck(candidatePassword) {
    try {
        const match = await bcrypt.compare(candidatePassword, this.password);

        return match;
    } catch (error) {
        return error;
    }
};

module.exports = connections.model('UserModel', UserSchema);
