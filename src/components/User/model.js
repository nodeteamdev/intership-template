"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connection_1 = __importDefault(require("../../config/connection"));
const UserSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    collection: 'usermodel',
    versionKey: false,
});
exports.default = connection_1.default.model('UserModel', UserSchema);
