const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const Books = new Schema(
  {
    code3: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    collection: 'booksmodel',
    versionKey: false,
    timestamps: true,
  },
);

module.exports = connections.model('Booksmodel', Books);
