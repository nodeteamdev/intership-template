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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const router_1 = __importDefault(require("../components/User/router"));
const router_2 = __importDefault(require("../components/Auth/router"));
// const BooksRouter = require('../components/Books/router');
// const AuthComponent = require('../components/Auth/index');
exports.default = {
    /**
       * @function
       * @param {express.Application} app
       * @summary init Application router
       * @returns void
       */
    init(app) {
        const router = express_1.default.Router();
        /**
             * Forwards any requests to the /v1/users URI to UserRouter.
             * @name /v1/users
             * @function
             * @inner
             * @param {string} path - Express path
             * @param {callback} middleware - Express middleware.
             */
        // app.use('/v1/users', AuthComponent.verifyAccessToken, UserRouter);
        app.use('/v1/users', router_1.default);
        app.use('/v1/auth', router_2.default);
        // app.use('/v1/books', BooksRouter);
        /**
             * @description No results returned mean the object is not found
             * @function
             * @inner
             * @param {callback} middleware - Express middleware.
             */
        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });
        /**
             * @function
             * @inner
             * @param {express.Router}
             */
        app.use(router);
    },
};
