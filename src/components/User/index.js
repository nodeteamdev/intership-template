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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var service_1 = require("./service");
var validation_1 = require("./validation");
var ValidationError_1 = require("../../error/ValidationError");
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
function findAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var users, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, service_1["default"].findAll()];
                case 1:
                    users = _a.sent();
                    res.status(200).json({
                        data: users
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    next(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var error, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    error = validation_1["default"].findByEmail(req.body).error;
                    if (error) {
                        throw new ValidationError_1["default"](error.details);
                    }
                    return [4 /*yield*/, service_1["default"].findByEmail(req.body.email)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            data: user
                        })];
                case 2:
                    error_2 = _a.sent();
                    return [2 /*return*/, next(error_2)];
                case 3: return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var error, user, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    error = validation_1["default"].create(req.body).error;
                    if (error) {
                        throw new ValidationError_1["default"](error.details);
                    }
                    return [4 /*yield*/, service_1["default"].create(req.body)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            data: user
                        })];
                case 2:
                    error_3 = _a.sent();
                    return [2 /*return*/, next(error_3)];
                case 3: return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var error, updatedUser, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    error = validation_1["default"].updateByEmail(req.body).error;
                    if (error) {
                        throw new ValidationError_1["default"](error.details);
                    }
                    return [4 /*yield*/, service_1["default"].updateByEmail(req.body.email, req.body)];
                case 1:
                    updatedUser = _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            data: updatedUser
                        })];
                case 2:
                    error_4 = _a.sent();
                    return [2 /*return*/, next(error_4)];
                case 3: return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var error, deletedUser, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    error = validation_1["default"].deleteByEmail(req.body).error;
                    if (error) {
                        throw new ValidationError_1["default"](error.details);
                    }
                    return [4 /*yield*/, service_1["default"].deleteByEmail(req.body.email)];
                case 1:
                    deletedUser = _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            data: deletedUser
                        })];
                case 2:
                    error_5 = _a.sent();
                    return [2 /*return*/, next(error_5)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = {
    findAll: findAll,
    findByEmail: findByEmail,
    create: create,
    updateByEmail: updateByEmail,
    deleteByEmail: deleteByEmail
};
