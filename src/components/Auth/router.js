const { Router } = require('express');
const UserController = require('./index');

const router = Router();
/**
 * Route serving a user
 * @name /signUp
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/signup', (req, res) => res.render('formSignUp'))
    .post('/signup', UserController.signUp);

/**
 * Route serving a new user
 * @name /logIn
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/login', (req, res) => res.render('formLogIn'))
    .post('/login', UserController.logIn);

module.exports = router;
