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
const service_1 = __importDefault(require("./service"));
const validation_1 = __importDefault(require("./validation"));
const ValidationError_1 = __importDefault(require("../../error/ValidationError"));
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
function findAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield service_1.default.findAll();
            res.status(200).json({
                data: users,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
function findByEmail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = validation_1.default.findByEmail(req.body);
            if (error) {
                throw new ValidationError_1.default(error.details);
            }
            const user = yield service_1.default.findByEmail(req.body.email);
            res.status(200).json({
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = validation_1.default.create(req.body);
            if (error) {
                throw new ValidationError_1.default(error.details);
            }
            const user = yield service_1.default.create(req.body);
            res.status(200).json({
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
function updateByEmail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = validation_1.default.updateByEmail(req.body);
            if (error) {
                throw new ValidationError_1.default(error.details);
            }
            const updatedUser = yield service_1.default.updateByEmail(req.body.email, req.body);
            res.status(200).json({
                data: updatedUser,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
function deleteByEmail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = validation_1.default.deleteByEmail(req.body);
            if (error) {
                throw new ValidationError_1.default(error.details);
            }
            const deletedUser = yield service_1.default.deleteByEmail(req.body.email);
            res.status(200).json({
                data: deletedUser,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = {
    findAll,
    findByEmail,
    create,
    updateByEmail,
    deleteByEmail,
};
