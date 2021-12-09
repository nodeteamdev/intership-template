const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../User/model');

async function register(data) {
    const user = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
    };

    const newUser = new User(user);
    const saveUser = await newUser.save();
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
    const accessKey = process.env.ACCESS_KEY;
    const accessToken = jwt.sign({
        userId: user._id,
    }, accessKey, { expiresIn: '1h' });

    const refreshKey = process.env.REFRESH_KEY;
    const token = jwt.sign({
        userId: user._id,
    }, refreshKey, { expiresIn: 60 * 1000 * 60 * 24 * 7 });

    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken: token });

    return { accessToken, refreshToken: token };
}
async function refreshToken(userId) {
    console.log(userId);
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }
    const accessKey = process.env.ACCESS_KEY;
    const accessToken = jwt.sign({ userId }, accessKey, { expiresIn: '1h' });

    const refreshKey = process.env.REFRESH_KEY;
    const token = jwt.sign({ userId }, refreshKey, { expiresIn: '120' });

    return { accessToken, refreshToken: token };
}

module.exports = {
    register,
    login,
    refreshToken,
};
