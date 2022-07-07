const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/';
const MONGODB_DB_MAIN = 'users';
const MONGO_URI = `${MONGODB_URI}${MONGODB_DB_MAIN}`;

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

module.exports = mongoose.createConnection(MONGO_URI, connectOptions);
