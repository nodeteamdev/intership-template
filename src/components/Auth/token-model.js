const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({
  tokenId: String,
  password: String,
});

module.exports = model('Token', TokenSchema);
