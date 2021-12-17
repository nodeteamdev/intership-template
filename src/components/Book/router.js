const { Router } = require('express');
const BookComponent = require('.');
const { errorHandler } = require('../../error/errorsMiddleware');
const auth = require('../shared/authMiddleware');

/**
 * Express router to mount book related functions on.
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
router.get('/', errorHandler(BookComponent.findAll));

/**
 * Route serving a book
 * @name /v1/books/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:title', errorHandler(BookComponent.findByTitle));

/**
 * Route serving a new book
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', auth.authMiddleware, errorHandler(BookComponent.create));

/**
 * Route serving a new book
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/', auth.authMiddleware, errorHandler(BookComponent.updateByTitle));

/**
 * Route serving a new book
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', auth.authMiddleware, errorHandler(BookComponent.deleteById));

module.exports = router;
