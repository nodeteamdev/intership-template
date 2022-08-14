"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<User[]>
 */
function findAll() {
    return model_1.default.find({}).exec();
}
/**
 * @exports
 * @method findOne
 * @param {string} email
 * @summary get a user
 * @returns {Promise<User>}
 */
function findByEmail(email) {
    return model_1.default.findOne({ email }).exec();
}
/**
 * @exports
 * @method create
 * @param {User} profile
 * @summary create a new user
 * @returns {Promise<User>}
 */
function create(profile) {
    return model_1.default.create(profile);
}
/**
 * Find a user by id and update his profile
 * @exports
 * @method updateByEmail
 * @param {string} email
 * @param {object} newProfile
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
function updateByEmail(email, newProfile) {
    return model_1.default.updateOne({ email }, newProfile).exec();
}
/**
 * @exports
 * @method deleteOne
 * @param {string} email
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function deleteByEmail(email) {
    return model_1.default.deleteOne({ email }).exec();
}
exports.default = {
    findAll,
    findByEmail,
    create,
    updateByEmail,
    deleteByEmail,
};
