const User = require('../User/model');
const UserToken = require('./token_model');
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

async function logIn(req, res, next) {
    console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(401)
                .json({ error: true, message: "Invalid user's email" });

        const { accessToken, refreshToken } = await TokenService.generateTokens(user);

        res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            message: "Logged in sucessfully",
        });
    } catch (error) {
        next(error);
    }
}

function dashboard(req, res) {
    return res.json({status: true, message: 'Hello from dashboard'});
}

// async function getAccessToken(req, res, next) {

//     TokenService.verifyRefreshToken(req.body.refreshToken)
//         .then(({ tokenDetails }) => {
//             const payload = { _id: tokenDetails._id };
//             const accessToken = jwt.sign(
//                 payload,
//                 'ACCESS_TOKEN_PRIVATE_KEY',
//                 { expiresIn: "1m" }
//             );
//             res.status(200).json({
//                 error: false,
//                 accessToken,
//                 message: "Access token created successfully",
//             });
//         })
//         .catch((err) => next(err));

// }

// async function logOut(req, res, next) {
//     try {
        
//         const userToken = await UserToken.findOne({ token: req.body.refreshToken });
//         if (!userToken)
//             return res
//                 .status(200)
//                 .json({ error: false, message: "Logged Out Sucessfully" });

//         await userToken.remove();
//         res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
//     } catch (err) {
//         next(err);
//     }
// }

module.exports = {
    signUp,
    logIn,
    dashboard,
    // getAccessToken,
    // logOut,
}
