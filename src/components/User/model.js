const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connections = require('../../config/connection');

const { Schema } = mongoose;

const { JWT_SECRET } = process.env;

const { REFRESH_TOKEN_SECRET } = process.env;

const RefreshSchema = new Schema({
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  _id: {
    type: String,
  },
  firstname: {
    type: String,
  },
});

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

UserSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcryptjs.hash(User.password, 12);
  }
  next();
});

RefreshSchema.pre('save', async (next) => {
  const Refresh = this;
  next();
});

RefreshSchema.methods.generateAuthToken = function () {
  const obj = this;
  const secret = JWT_SECRET;
  const token = jwt.sign({ _id: obj._id }, secret, {
    expiresIn: '2m',
  });
  obj.accessToken = token;
};

RefreshSchema.methods.generateRefreshToken = function () {
  const obj = this;
  const secret = REFRESH_TOKEN_SECRET;
  const refreshToken = jwt.sign({ _id: obj._id }, secret, {
    expiresIn: '10m',
  });
  obj.refreshToken = refreshToken;
};

const User = connections.model('user', UserSchema);
const Refresh = connections.model('refresh', RefreshSchema);
module.exports = {
  User,
  Refresh,
};
