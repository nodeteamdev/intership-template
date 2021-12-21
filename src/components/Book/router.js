const { Router } = require('express');
const BookComponent = require('.');
const { errorHandler } = require('../../error/errorsMiddleware');
const auth = require('../shared/authMiddleware');

/**
 * @description Express router to mount book related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * @description Route serving list of books.
 * @name /v1/books
 * @method get
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', errorHandler(authMiddleware), errorHandler(BookComponent.findAll));

/**
 * @description Route serving list of books.
 * @name /v1/books/new-books
 * @method get
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/new-books', errorHandler(authMiddleware), errorHandler(BookComponent.newBooks));

/**
 * @description Route serving number of books per country.
 * @name /v1/count-per-country
 * @method get
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/count-per-country', errorHandler(authMiddleware), errorHandler(BookComponent.countPerCountry));

/**
 * @description Route serving a book by title
 * @name /v1/books/:id
 * @method get
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:title', errorHandler(BookComponent.findByTitle));

/**
 * @description Route serving a new book
 * @name /v1/books
 * @method post
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', auth.authMiddleware, errorHandler(BookComponent.create));

/**
 * @description Route serving a book update
 * @name /v1/books
 * @method put
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/', auth.authMiddleware, errorHandler(BookComponent.updateByTitle));

/**
 * @description Route for book removing
 * @name /v1/books
 * @method delete
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', auth.authMiddleware, errorHandler(BookComponent.deleteById));

module.exports = router;
