"use strict";
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
const token_model_1 = __importDefault(require("./token.model"));
const model_1 = __importDefault(require("../User/model"));
const service_1 = __importDefault(require("./service"));
const validation_1 = __importDefault(require("./validation"));
const ValidationError_1 = __importDefault(require("../../error/ValidationError"));
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = validation_1.default.validateUserData(req.body);
            if (error) {
                throw new ValidationError_1.default(error.details);
            }
            const savedUser = yield model_1.default.create(req.body);
            return res.status(201).json({ message: 'Account created sucessfully', data: savedUser });
        }
        catch (error) {
            return next(error);
        }
    });
}
function logIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = validation_1.default.validateUserData(req.body);
            if (error) {
                throw new ValidationError_1.default(error.details);
            }
            const user = yield model_1.default.findOne({ email: req.body.email, fullName: req.body.fullName });
            const accessToken = yield service_1.default.generateAccessToken(user.id);
            const refreshToken = yield service_1.default.generateRefreshToken(user.id);
            return res.status(200).json({
                message: 'Logged in sucessfully',
                data: { accessToken, refreshToken },
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
function getTokens(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = validation_1.default.validateToken(req.body);
        if (error) {
            throw new ValidationError_1.default(error.details);
        }
        const { token } = req.body;
        const decoded = yield service_1.default.decodeRefreshToken(token);
        const accessToken = yield service_1.default.generateAccessToken(decoded.userId);
        const refreshToken = yield service_1.default.generateRefreshToken(decoded.userId);
        return res.status(200).json({
            message: 'Successfully completed',
            data: { accessToken, refreshToken },
        });
    });
}
function verifyAccessToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [, token] = req.headers.authorization.split(' ');
            const decoded = yield service_1.default.decodeAccessToken(token);
            req.userData = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({ message: 'Your session is not valid.', data: error });
            next(error);
        }
    });
}
function verifyRefreshToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = validation_1.default.validateToken(req.body);
            if (error) {
                throw new ValidationError_1.default(error.details);
            }
            const { token } = req.body;
            const decoded = yield service_1.default.decodeRefreshToken(token);
            const refreshToken = yield token_model_1.default.findOne({ userId: decoded.userId }).exec();
            if (refreshToken === undefined)
                return res.status(401).json({ message: 'Invalid request. Token not defined' });
            if (refreshToken.token !== token)
                return res.status(401).json({ message: 'Invalid request. Token not valid' });
            return next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Your session is not valid.', data: error });
        }
    });
}
function logOut(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.userData;
        try {
            const userToken = yield token_model_1.default.findOne({ userId });
            if (!userToken) {
                return res
                    .status(200)
                    .json({ message: 'Logged Out Sucessfully' });
            }
            yield userToken.remove();
            return res.status(200).json({ message: 'Logged Out Sucessfully' });
        }
        catch (err) {
            return next(err);
        }
    });
}
exports.default = {
    signUp,
    logIn,
    getTokens,
    verifyAccessToken,
    verifyRefreshToken,
    logOut,
};
