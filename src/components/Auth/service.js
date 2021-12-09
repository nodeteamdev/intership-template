const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../User/model');

async function register(data) {
    const password = await bcrypt.hash(data.password, 10);

    const user = {
        email: data.email,
        fullName: data.fullName,
        password,
    };

    const newUser = new User(user);

    return newUser.save();
}

async function login(data) {
    const user = await User.findOne({ email: data.email });

    if (!user) {
        throw new Error('Login is incorrect');
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

    if (!isPasswordCorrect) {
        throw new Error('Password is incorrect');
    }

    const accessToken = jwt.sign({
        userId: user._id,
    }, 'secret');

    await User.findByIdAndUpdate(user._id, { accessToken });

    return { accessToken };
}

module.exports = {
    register,
    login,
};
