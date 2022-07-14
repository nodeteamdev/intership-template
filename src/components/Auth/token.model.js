const { Schema } = require('mongoose');
const connections = require('../../config/connection')

const TokenSchema = Schema({
    tokenId: String,
    userId: String,
},
{
    collection: 'refreshtokens',
    versionKey: false,
},);

module.exports = connections.model('Token', TokenSchema);
