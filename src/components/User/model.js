"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var connection_1 = require("../../config/connection");
var UserSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    collection: 'usermodel',
    versionKey: false
});
// interface UserModel extends Document {
//   fullName: string,
//   email: string,
// }
exports["default"] = connection_1["default"].model('UserModel', UserSchema);
