const { Router } = require('express');
const BookComponent = require('.');
const isAuth = require('../Auth/middleware');

const router = Router();

router.get('/count-per-country', isAuth, BookComponent.getCountryBooksController);

router.get('/new-books', isAuth, BookComponent.getNewBooksController);

module.exports = router;
