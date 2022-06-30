// const { Schema } = require('mongoose');
// const connections = require('../../config/connection');

// const UserSchema = new Schema(
//   {
//     fullName: {
//       type: String,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     collection: 'usermodel',
//     versionKey: false,
//   },
// );

// module.exports = connections.model('UserModel', UserSchema);

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connections = require('../../config/connection');

const Schema = mongoose.Schema;

const { JWT_SECRET } = process.env;

const { REFRESH_TOKEN_SECRET } = process.env;

const UserSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },

  token: {
    type: String,
  },

  refreshToken: {
    type: String,
  },

});

UserSchema.methods.generateAuthToken = function () {
  const User = this;
  const secret = JWT_SECRET;
  const token = jwt.sign({ _id: User._id }, secret, {
    expiresIn: '2m',
  });
  User.token = token;
};

UserSchema.methods.generateRefreshToken = function () {
  const User = this;
  const secret = REFRESH_TOKEN_SECRET;
  const refreshToken = jwt.sign({ _id: User._id }, secret, {
    expiresIn: '5m',
  });
  User.refreshToken = refreshToken;
};

UserSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcryptjs.hash(User.password, 12);
  }
  next();
});

const User = connections.model('user', UserSchema);
module.exports = User;
