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
    refreshToken: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      timestamp: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      timestamp: true,
    },
  },
  {
    collection: 'authmodel',
    versionKey: false,
  },
);

module.exports = connections.model('AuthModel', Auth);
