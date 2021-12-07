const { Router } = require('express');
const AuthComponent = require('./index');

/**
 * Express router to mount auth related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving a new user
 * @name /v1/auth/registrations
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/registrations', AuthComponent.create);

// /**
//  * Route serving sign in.
//  * @name /v1/auth/signin
//  * @function
//  * @inner
//  * @param {string} path - Express path
//  * @param {callback} middleware - Express middleware.
//  */
// router.post('/signin', AuthComponent.signIn);

// /**
//  * Route serving sign out.
//  * @name /v1/auth/signout
//  * @function
//  * @inner
//  * @param {string} path - Express path
//  * @param {callback} middleware - Express middleware.
//  */
// router.get('/signout', AuthComponent.signOut);

module.exports = router;
