const express = require('express');

const router = express.Router();
const bookController = require('./index');
const { auth } = require('../../middleware/auth');

router.get('/add', auth, bookController.addBooks);
router.get('/:id/count-per-country', auth, bookController.countPerCountry);
router.get('/:id/search/:code3', auth, bookController.searchByCode);
router.get('/:id/new-books', auth, bookController.newBooks);

module.exports = router;
