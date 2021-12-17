const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../User/model');

async function register(data) {
    const user = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
    };

    const saveUser = await new User(user).save();
    const { password, ...userwiThoutPassword } = saveUser.toJSON();
    return userwiThoutPassword;
}

async function login(data) {
    const user = await User.findById(data._id);

    if (!user) {
        throw new Error('Login is incorrect');
    }
    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

    if (!isPasswordCorrect) {
        throw new Error('Password is incorrect');
    }
    const accessToken = jwt.sign({
        userId: user._id,
    }, process.env.ACCESS_KEY, { expiresIn: '1h' });

    const refreshToken = jwt.sign({
        userId: user._id,
    }, process.env.REFRESH_KEY, { expiresIn: 60 * 1000 * 60 * 24 * 7 });

    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

    return { accessToken, refreshToken };
}
async function generateTokens(userId) {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    const accessToken = jwt.sign({ userId }, process.env.ACCESS_KEY, { expiresIn: '1h' });

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_KEY, { expiresIn: '2h' });

    return { accessToken, refreshToken };
}

module.exports = {
    register,
    login,
    generateTokens,
};
