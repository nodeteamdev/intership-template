const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const TokenSchema = new Schema(
  {
    token: String,
    userId: String,
  },
  {
    collection: 'tokenmodel',
    versionKey: false,
  },
);

module.exports = connections.model('TokenModel', TokenSchema);
