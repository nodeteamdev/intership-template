const { Router } = require('express');

const router = Router();

const { getBooksCountPerCountry, getNewBooks } = require('./index');

router.get('/v1/books/count-per-country', getBooksCountPerCountry);

router.get('/v1/books/new-books', getNewBooks);

module.exports = router;
