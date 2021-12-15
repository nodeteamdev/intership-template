const { Router } = require('express');
const AuthUserComponent = require('.');
/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route to sing up.
 * @name /v1/auth/signUp
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/signUp', AuthUserComponent.signUp);

/**
 * Route to sign in
 * @name /v1/auth/singIn
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback}  - Express middleware
 */
router.post('/signIn', AuthUserComponent.signIn);

/**
 * Route to refreshAccessToken
 * @name /v1/auth/refreshToken
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback}  - Express middleware
 */
router.post('/refreshToken', AuthUserComponent.refreshAccessToken);

/**
 * Route to get form to input email
 * @name /v1/auth/forgotPassword
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback}  - Express middleware
 */
router.get('/forgotPassword', AuthUserComponent.forgotPassword);

/**
 * Route to change password
 * @name /v1/auth/confirmEmail
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback}  - Express middleware
 */
router.post('/confirmEmail', AuthUserComponent.confirmEmail);

/**
 * Route to get form to input new password
 * @name /v1/auth/newPasswordForm
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback}  - Express middleware
 */
router.get('/newPasswordForm', AuthUserComponent.newPasswordForm);

/**
 * Route to get form to input new password
 * @name /v1/auth/resetPassword
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback}  - Express middleware
 */
router.post('/resetPassword', AuthUserComponent.resetPassword);

module.exports = router;
