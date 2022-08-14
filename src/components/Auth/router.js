"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("./index"));
const router = (0, express_1.Router)();
router.post('/signup', index_1.default.signUp);
router.post('/login', index_1.default.logIn);
router.post('/token', index_1.default.verifyRefreshToken, index_1.default.getTokens);
router.delete('/logout', index_1.default.verifyAccessToken, index_1.default.logOut);
exports.default = router;
