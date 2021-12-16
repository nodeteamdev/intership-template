const { Router } = require('express');
const AuthComponent = require('.');
const { errorHandler } = require('../../error/errorsMiddleware');
const authMiddleware = require('../shared/authMiddleware');

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
router.get('/refreshToken', errorHandler(authMiddleware), errorHandler(AuthComponent.refreshToken));

/**
 * Route that serve token payload
 * @name /v1/auth/payload
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/payload', errorHandler(authMiddleware), errorHandler(AuthComponent.payload));

/**
 * Logout route
 * @name /v1/auth/logout
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/logout', errorHandler(authMiddleware), errorHandler(AuthComponent.logout));

module.exports = router;
