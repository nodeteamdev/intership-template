require('dotenv').config();
const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const connections = require('../../config/connection');

const SALT = Number(process.env.SALT);

const UserSchema = new Schema(
    {
        name: {
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
    },
    {
        collection: 'usermodel',
        versionKey: false,
    },
);

UserSchema.pre('save', async function(next) {
    try {
        const user = this;
        const salt = await bcrypt.genSalt(SALT);
        const hash = await bcrypt.hashSync(user.password, salt);
        user.password = hash;
        return next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.comparePassword = async function(password) {
    if (!password) {
        throw new Error('Raroll has nothing to compare!');
    }
    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        throw new Error(`Error while comparing password!${error.message}`);
    }
};

module.exports = connections.model('UserModel', UserSchema);
