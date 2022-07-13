const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const BookSchema = new Schema({
  code3: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// BookSchema.pre('save', async function (next) {
//   const books = this;
//   if (user.isModified('password')) {
//     user.password = await bcryptjs.hash(user.password, 12);
//   }
//   next();
// });

const book = connections.model('book', BookSchema);
module.exports = {
  book,
};
