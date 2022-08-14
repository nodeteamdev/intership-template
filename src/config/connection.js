"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = 'mongodb://localhost:27017/';
const MONGODB_DB_MAIN = 'users_db';
const MONGO_URI = `${MONGODB_URI}${MONGODB_DB_MAIN}`;
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
exports.default = mongoose_1.default.createConnection(MONGO_URI, connectOptions);
