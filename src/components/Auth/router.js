const { Router } = require('express');
const AuthComponent = require('.');
const AuthMiddleware = require('./middleware');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving a signing up users
 * @name /v1/auth/signUp
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/signUp', AuthComponent.signUp);

/**
 * Route serving a signing in users
 * @name /v1/auth/signIn
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/signIn', AuthComponent.signIn);

/**
 * Route serving for refreshing token
 * @name /v1/auth/refreshtoken
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/refreshtoken', AuthComponent.refreshToken);

module.exports = router;
