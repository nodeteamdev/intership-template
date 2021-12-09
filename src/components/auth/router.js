const { Router, request, response } = require('express');
const AuthUserComponent = require('.');
// eslint-disable-next-line import/extensions
const authMiddleware = require('../User/authMiddleware');
/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /v1/signUp
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/signUp', AuthUserComponent.signUp);

/**
 * Route for user login
 * @name /v1/users/login
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback}  - Express middleware
 */
router.post('/signIn', AuthUserComponent.signIn);

/**
 * Route for user login
 * @name /v1/users/refresh-token
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback}  - Express middleware
 */
router.post('/refreshToken', AuthUserComponent.refreshToken);

module.exports = router;
