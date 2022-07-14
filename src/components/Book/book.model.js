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

const book = connections.model('book', BookSchema);

module.exports = {
  book,
};
