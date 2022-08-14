"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connection_1 = __importDefault(require("../../config/connection"));
const UserTokenSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
}, {
    collection: 'tokenmodel',
    versionKey: false,
});
exports.default = connection_1.default.model('UserToken', UserTokenSchema);
