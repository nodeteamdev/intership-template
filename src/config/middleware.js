"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const errorHandlers_1 = __importDefault(require("../error/errorHandlers"));
exports.default = {
    /**
       * @function
       * @description express middleware
       * @param {express.Application} app
       * @returns void
       */
    init(app) {
        app.use(body_parser_1.default.urlencoded({
            extended: false,
        }));
        app.use(body_parser_1.default.json());
        app.use((0, cookie_parser_1.default)());
        app.use((0, compression_1.default)());
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)());
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,'
                + ' Content-Type, Accept,'
                + ' Authorization,'
                + ' Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    },
    errors(app) {
        app.use(errorHandlers_1.default.logErrors);
        app.use(errorHandlers_1.default.clientErrorHandler);
        app.use(errorHandlers_1.default.errorHandler);
    },
};
