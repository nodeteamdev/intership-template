const BookFunction = require('./service');

async function getBooksByCountry(req,res,next){
    try{
        const answerBooks = BookFunction.getBooks()
        return res.status(200).json(answerBooks);
    }
    catch(error){
        next(error)
    }
}

async function getNewBooks(req,res,next){
    try {
        const newBooks = BookFunction.getNewBooks();
        return res.status(200).json(newBooks)
    }
    catch(error){
        next(error);
    }
}

module.exports = {
    getBooksByCountry,
    getNewBooks
};