const { Router } = require('express');
const AuthComponent = require('.');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving sign in
 * @name /v1/auth/signin
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/signin', AuthComponent.signIn);

/**
 * Route serving refresh-tokens
 * @name /v1/auth/signin
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/refresh-tokens', AuthComponent.refreshTokens);

/**
 * Route serving sign up
 * @name /v1/auth/signup
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/signup', AuthComponent.signUp);

module.exports = router;
