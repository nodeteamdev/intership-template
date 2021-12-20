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
router
  .get('/signUp', (req, res) => res.render('signup'))
  .post('/signUp', AuthComponent.signUp);

/**
 * Route serving a signing in users
 * @name /v1/auth/signIn
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
  .get('/signIn', (req, res) => {
    res.render('signin');
  })
  .post('/signIn', AuthComponent.signIn);

/**
 * Route serving for refreshing token
 * @name /v1/auth/refreshtoken
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/refreshtoken', AuthMiddleware, AuthComponent.refreshToken);

/**
 * Route serving forgot password
 * @name /v1/auth/forgot_password
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
  .get('/forgot-password', (req, res) => res.render('forgot'))
  .post('/forgot-password', AuthComponent.forgotPassword);

/**
 * Route serving for reset password
 * @name /v1/auth/password_reset/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router
  .get('/password-reset/:token', AuthMiddleware, (req, res) => res.render('reset'))
  .post('/password-reset/:token', AuthMiddleware, AuthComponent.resetPassword);

module.exports = router;
