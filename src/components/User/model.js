const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      trim: true,
    },
  },
  {
    collection: 'usermodel',
    versionKey: false,
  },
);

module.exports = connections.model('UserModel', UserSchema);
