require('dotenv').config();
const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

module.exports = mongoose.createConnection(MONGODB_URI, connectOptions);
