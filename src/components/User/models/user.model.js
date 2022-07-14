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
  viewedBooks: {
    type: Array,
  },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 12);
  }
  next();
});

UserSchema.methods.addViewedBooks = function (viewedBooksObject) {
  const obj = this;
  obj.viewedBooks.push(viewedBooksObject);
};

const user = connections.model('user', UserSchema);

module.exports = {
  user,
};
