const { Router } = require('express');
const BooksComponent = require('.');
const withCatch = require('../../config/with-catch');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', withCatch(BooksComponent.findAll));

/**
 * Route serving a user
 * @name /v1/books/count-per-country
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/count-per-country', withCatch(BooksComponent.getGroupedByCountry));

/**
 * Route serving a user
 * @name /v1/books/count-per-country
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/new-books', withCatch(BooksComponent.getNewBooks));

/**
 * Route serving a user
 * @name /v1/books/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', withCatch(BooksComponent.findById));

/**
 * Route serving a new user
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', withCatch(BooksComponent.create));

/**
 * Route serving a new user
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/', withCatch(BooksComponent.updateById));

/**
 * Route serving a new user
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', withCatch(BooksComponent.deleteById));

module.exports = router;
