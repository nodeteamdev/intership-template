const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'usermodel',
    versionKey: false,
  },
);

module.exports = connections.model('UserModel', UserSchema);
