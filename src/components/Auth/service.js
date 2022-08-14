"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const token_model_1 = __importDefault(require("./token.model"));
const accessKey = 'ACCESS_TOKEN_PRIVATE_KEY';
const refreshKey = 'REFRESH_TOKEN_PRIVATE_KEY';
function generateAccessToken(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = { userId };
        const accessToken = jwt.sign(payload, accessKey, { expiresIn: '5m' });
        return accessToken;
    });
}
function generateRefreshToken(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = { id };
        const refreshToken = jwt.sign(payload, refreshKey, { expiresIn: '1h' });
        const oldRefreshToken = yield token_model_1.default.findOne({ userId: id }).exec();
        if (oldRefreshToken === null) {
            yield token_model_1.default.create({ userId: id, token: refreshToken }).exec();
        }
        else {
            yield token_model_1.default.updateOne({ id }, { token: refreshToken }).exec();
        }
        return refreshToken;
    });
}
function decodeAccessToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoded = yield jwt.verify(token, accessKey);
        return decoded;
    });
}
function decodeRefreshToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoded = yield jwt.verify(token, refreshKey);
        // const [userId] = decoded;
        return decoded;
    });
}
exports.default = {
    generateAccessToken,
    generateRefreshToken,
    decodeAccessToken,
    decodeRefreshToken,
};
