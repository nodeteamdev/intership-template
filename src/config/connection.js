const mongoose = require('mongoose');
const logger = require('../helpers/logger');

const MONGODB_URI = 'mongodb://localhost:27017/';
const MONGODB_DB_MAIN = 'users_db';
const MONGO_URI = `${MONGODB_URI}${MONGODB_DB_MAIN}`;

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 2000,
};

const mongooseConnection = mongoose.createConnection(MONGO_URI, connectOptions, (error) => {
    if (error) {
        logger(error.message, 'mongooseConnection error', 'error');
        process.exit(1);
    }
});

mongooseConnection.on('error', (error) => {
    logger(error, 'mongooseConnection.onError event', 'error');
});

module.exports = mongooseConnection;
