"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../config/middleware"));
const router_1 = __importDefault(require("../config/router"));
/**
 * @type {express}
 * @constant {express.Application}
 */
const app = (0, express_1.default)();
/**
 * @description express.Application Middleware
 */
middleware_1.default.init(app);
/**
 * @description express.Application Routes
 */
router_1.default.init(app);
/**
 * @description express.Application Middleware
 */
middleware_1.default.errors(app);
/**
 * @description sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000);
exports.default = app;
