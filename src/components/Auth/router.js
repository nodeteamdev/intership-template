const { Router } = require('express');
const AuthComponent = require('.');
const { errorHandler } = require('../../error/errorsMiddleware');
const auth = require('../shared/authMiddleware');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route for signing up.
 * @name /v1/auth/sign-up
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/sign-up', errorHandler(AuthComponent.signUp));

/**
 * Route for signing in.
 * @name /v1/auth/sign-in
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/sign-in', errorHandler(AuthComponent.signIn));

/**
 * Route for refreshing access token
 * @name /v1/auth/refreshToken
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/refreshToken', errorHandler(AuthComponent.refreshToken));

/**
 * Route for sending reset-password mail
 * @name /v1/auth/resetPassword
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/resetPassword', errorHandler(AuthComponent.sendResetPassword));

/**
 * Route for reseting password
 * @name /v1/auth/resetPassword
 * @method GET
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/resetPassword/:token', errorHandler(AuthComponent.resetPasswordPage));

/**
 * Route for reseting password
 * @name /v1/auth/resetPassword
 * @method UPDATE
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/resetPassword/:token', errorHandler(AuthComponent.resetPassword));

/**
 * Route that serve token payload
 * @name /v1/auth/payload
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/payload', auth.authMiddleware, errorHandler(AuthComponent.payload));

/**
 * Logout route
 * @name /v1/auth/logout
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/logout', auth.authMiddleware, errorHandler(AuthComponent.logout));

module.exports = router;
