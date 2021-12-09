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
        accesTken: {
            type: String,
            required: false,
        },
    },
    {
        collection: 'usermodel',
        versionKey: false,
    },
);
UserSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

module.exports = connections.model('UserModel', UserSchema);
