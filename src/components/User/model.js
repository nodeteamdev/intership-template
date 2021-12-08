const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'usermodel',
    versionKey: false,
  },
);

module.exports = model('UserModel', UserSchema);
