const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const Auth = new Schema(
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
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    collection: 'authmodel',
    versionKey: false,
  },
);

module.exports = connections.model('AuthModel', Auth);