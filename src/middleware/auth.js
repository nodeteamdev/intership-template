const jwt = require('jsonwebtoken');
const UserModel = require('../components/User/model');

require('dotenv').config();

const { JWT_SECRET } = process.env;

exports.auth = async (req, res, next) => {
  try {
    const id = req.params._id;
    console.log(id);
    const token = await UserModel.Refresh.findById({ _id: id }).exec();

    if (!token.accessToken) {
      return res.send({ status: 403, message: 'A token is required for authentication' });
    }
    try {
      const decoded = jwt.verify(token.accessToken, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.send({ status: 401, message: 'Invalid Token' });
    }
    return next();
  } catch (error) {
    res.send({
      status: 401,
      error,
      message: 'User session expired,Log in to continue',
    });
  }
};
