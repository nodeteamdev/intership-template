const { Router, request, response } = require('express');
const UserComponent = require('.');
// eslint-disable-next-line import/extensions
const authMiddleware = require('../../config/authMiddleware.js');
/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', authMiddleware.verifyToken, UserComponent.findAll);

/**
 * Route serving a user
 * @name /v1/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', authMiddleware.verifyToken, UserComponent.findById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', authMiddleware.verifyToken, UserComponent.create);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/', authMiddleware.verifyToken, UserComponent.updateById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', authMiddleware.verifyToken, UserComponent.deleteById);

// My code ////////////////////////
/**
 * Route for user login
 * @name /v1/users/login
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback}  - Express middleware
 */
router.post('/login', UserComponent.loginUser);
// My code ////////////////////////

module.exports = router;
