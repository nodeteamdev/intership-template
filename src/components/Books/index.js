const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const BookService = require('./service');
const BookValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

async function countPerCountry(req, res, next) {
    try {
        const books = await BookService.countPerCountry();

        const bookList = [];

        for (let i = 0; i < books.length; 1++) {
            const element = books[i];
            bookList.push({  code3: element._id, value: element.value });
        }

        res.status(200).json({ data: bookList });
    } catch (error) {
        next(error);
    }
}

async function findNewestBooks(req, res, next) {
    try {
        const books = await BookService.findNewestBooks();

        res.status(200).json({
            data: books,
        });
    } catch (error) {
        next(error);
    }
}

async function findAll(req, res, next) {        //если в сервисах, скажем, Юзера есть такой же самый метод - можно ли его заимпортить или лучше такой же новый создать, но пусть он будет лучше тут ?
    try {
        const books = await BookService.findAll();

        res.status(200).json({
            data: books,
        });
    } catch (error) {
        next(error);
    }
}

async function findById(req, res, next) {
    try {
        const { error, value } = BookValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        const book = await BookService.findById(value.id);

        res.status(200).json({
            data: book,
        });
    } catch (error) {
        next(error);
    }
}

async function updateById(req, res, next) {
    try {
        const { error, value } = BookValidation.updateById(req.body);

        if(error) {
            throw new ValidationError(error.details);
        }

        const updatedBook = await BookService.updateById(value);

        res.status(200).json({
            data: updatedBook,
        });
    } catch (error) {
        next(error);
    }
}

async function deleteById(req, res, next) {
    try {
        const { error, value } = BookValidation.deleteById(req.body);

        if(error) {
            throw new ValidationError(error.detals);
        }

        const deletedBook = await BookService.deleteById(value.id);

        res.status(200).json({
            data: deletedBook,
        });
    } catch(error) {
        next(error);
    }
}

async function upload(req, res, next) {
    try {
        if(req.file === undefinded) {
            throw new Error('Please, upload a CSV file');
        }

        fs.createReadStream(path.resolve(__dirname, '../../', 'resoursces/uploads', req.file.filename))
          .pipe(csv.parse())
          .on('error', (error) => { throw error(error.details); })
          .on('data', (row) => {
            const BookLayout = {
                code3: row[0],
                title: row[1],
                description: row[2],
            };

            BookService.create(BookLayout);
          })
          .on('end', (rowCount) => {
            console.info(`Parsed ${rowCount} rows`);
            res.status(200).json({ data: {message: `Data from CSV file was been saved on database` } });
          });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    findAll,
    findById,
    updateById,
    deleteById,
    upload,
    countPerCountry,
    findNewestBooks,
  };