const { Schema } = require('mongoose');
const connections = require('../../config/connection')

const AuthSchema = Schema({
    email: String,
    password: String,
},
{
    collection: 'usermodel',
    versionKey: false,
},);

module.exports = connections.model('Auth', AuthSchema);
