const { Router } = require('express');
const AuthComponent = require('.');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving user registrations
 * @name /v1/auth/signup
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/signup', AuthComponent.signUp);

/**
 * Route serving user login
 * @name /v1/auth/signin
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/signin', AuthComponent.signIn);

/**
 * Route serving refresh-token
 * @name /v1/auth/refresh
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/refresh', AuthComponent.refresh);

module.exports = router;
