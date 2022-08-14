const { Router } = require('express');
const BooksComponent = require('.');

const router = Router();

router.get('/count-per-country', BooksComponent.countPerCountry);
router.get('/new-books', BooksComponent.getNewBooks);

module.exports = router;
