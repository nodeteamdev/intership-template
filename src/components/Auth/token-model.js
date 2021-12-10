const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({
  id: String,
  userId: String,
});

module.exports = model('Token', TokenSchema);
