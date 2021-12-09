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
    console.log(saveUser);
    return userwiThoutPassword;
}

async function login(data) {
    const user = await User.findOne({ fullName: data.fullName });

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
    const refreshToken = jwt.sign({
        userId: user._id,
    }, refreshKey, { expiresIn: '120' });

    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

    return { accessToken, refreshToken };
}

module.exports = {
    register,
    login,
};
