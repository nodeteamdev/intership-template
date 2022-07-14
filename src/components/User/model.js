const { Schema } = require('mongoose');
const connections = require('../../config/connection');
const { HASH_SALT } = require('../../config/dotenvConstants');
const AuthService = require('../Auth/service');

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
).pre('save', async (next) => {
    try {
        const user = this;
        const hash = await bcrypt.hashSync(password, HASH_SALT);

        user.password = hash;
        next();
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
