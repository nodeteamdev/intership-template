const { Router } = require('express');
const booksController = require('./controller');

const router = Router();

router.get('/count-per-country', booksController.getBooksPerCountry);
router.get('/new-books', booksController.getNewBooks);

module.exports = router;