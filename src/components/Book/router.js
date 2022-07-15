const { Router } = require('express');
const asyncErrorCatcher = require('../../middleware/errorHandlers/asyncErrorCatcher');
const BookComponent = require('.');

const router = Router();

/**
 * @name /v1/books/count-per-country
 */
router.get(
    '/count-per-country',
    asyncErrorCatcher(BookComponent.getCountPerCountry),
);

/**
 * @name /v1/books/new-books
 */
router.get(
    '/new-books',
    asyncErrorCatcher(BookComponent.getNewBooks),
);

module.exports = router;
