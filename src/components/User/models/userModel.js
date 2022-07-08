const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');
const connections = require('../../../config/connection');

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 12);
  }
  next();
});

const user = connections.model('user', UserSchema);
module.exports = {
  user,
};
