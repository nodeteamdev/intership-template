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
 * @name /v1/books/count-per-country
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/count-per-country', AuthUserComponent.signUp);

module.exports = router;
