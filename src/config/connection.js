const mongoose = require('mongoose');

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_MAIN = process.env.MONGODB_DB_MAIN;
const MONGO_URI = `${MONGODB_URI}${MONGODB_DB_MAIN}`;

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

module.exports = mongoose.createConnection(MONGO_URI, connectOptions);
