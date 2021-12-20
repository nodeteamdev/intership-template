const { Router } = require('express');
const BookComponent = require('.');
const AuthMiddleware = require('../Auth/middleware');
const upload = require('../../config/upload');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of books.
 * @name /v1/books/upload
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/upload', upload.single('file'), BookComponent.upload);

/**
 * Route serving list of books.
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/count-per-country', AuthMiddleware, BookComponent.countPerCountry);

/**
 * Route serving list of books.
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/new-books', AuthMiddleware, BookComponent.findNewestBooks);

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
