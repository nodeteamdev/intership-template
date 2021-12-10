const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/users_db';

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

module.exports = mongoose.createConnection(MONGO_URI, connectOptions);
