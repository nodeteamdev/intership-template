const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const BookSchema = new Schema(
    {
        code3: String,
        title: String,
        description: String,
    }, 
    { 
        timestamps: true,
        versionKey: false,
    }
);

module.exports = connections.model('BookModel', BookSchema);
