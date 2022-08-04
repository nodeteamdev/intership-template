const { Schema } = require('mongoose');
const connections = require('../config/connection');

const MessageSchema = new Schema(
  {
    name: {
      type: String,
    },
    message: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  {
    collection: 'chatmessagemodel',
    versionKey: false,
  },
);

module.exports = connections.model('MessageModel', MessageSchema);