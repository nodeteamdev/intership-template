const { Router } = require('express');
const BookComponent = require('.');
const AuthMiddleware = require('../Auth/middleware');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of books.
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', AuthMiddleware, BookComponent.findAll);

/**
 * Route serving a user
 * @name /v1/books/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', AuthMiddleware, BookComponent.findById);

/**
 * Route serving a new user
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/', AuthMiddleware, BookComponent.updateById);

/**
 * Route serving a new user
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', AuthMiddleware, BookComponent.deleteById);

module.exports = router;
