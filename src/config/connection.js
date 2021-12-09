const mongoose = require('mongoose');

const MONGODB_USER = 'rostislav';
const MONGODB_PASSWORD = 'jqsZA5CXnB77Kzs';
const MONGODB_CLUSTER = 'cluster1';
const MONGODB_DB_MAIN = 'users_db';
const MONGO_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.n8lff.mongodb.net/${MONGODB_DB_MAIN}?retryWrites=true&w=majority`;

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

module.exports = mongoose.createConnection(MONGO_URI, connectOptions);
