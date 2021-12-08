const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
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

const TokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'UserModel' },
    refreshToken: { type: String, required: true },
  },
);

const UserModel = model('UserModel', UserSchema);
const TokenModel = model('TokenModel', TokenSchema);

module.exports = {
  UserModel,
  TokenModel,
};
