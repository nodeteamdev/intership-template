"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var MONGODB_URI = 'mongodb://localhost:27017/';
var MONGODB_DB_MAIN = 'users_db';
var MONGO_URI = "".concat(MONGODB_URI).concat(MONGODB_DB_MAIN);
var connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
exports["default"] = mongoose.createConnection(MONGO_URI, connectOptions);
