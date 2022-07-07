const { Router } = require('express');
const AuthComponent = require('.');
const isAuthenticated = require('../../config/middleware/isAuthenticated');
const withCatch = require('../../config/with-catch');
/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /v1/users/sign-up
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/sign-up', withCatch(AuthComponent.signUp));

/**
 * Route serving a user
 * @name /v1/users/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/login', withCatch(AuthComponent.login));

/**
 * Route serving a new user
 * @name /v1/users/refresh
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/refresh', withCatch(AuthComponent.refreshTokens));

/**
 * Route serving a new user
 * @name /v1/users/logout
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/logout', isAuthenticated, withCatch(AuthComponent.logout));

module.exports = router;
