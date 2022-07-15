const { Router } = require('express');
const BookFunctions = require('./index');
const router = Router();


router.get("/booksEveryCountry",BookFunctions.getBooksByCountry);

router.get("/newBooks", BookFunctions.getNewBooks);

module.exports = {router};