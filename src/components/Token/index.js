const User = require('../User/model');
const TokenService = require('./service');

async function signUp(req, res, next) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(400)
                .json({ error: true, message: "User with given email already exist" });
        await  User.create(req.body);
                res
                    .status(201)
                    .json({ error: false, message: "Account created sucessfully" });
        
    } catch(error) {
        next(error)
    }
}

module.exports = {
    signUp,
}