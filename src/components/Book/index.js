const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const BookService = require('./service');
const BookValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
  try {
    const books = await BookService.findAll();

    res.status(200).json({
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: null,
    });

    next(error);
  }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res, next) {
  try {
    const { error, value } = BookValidation.findById(req.params);

    if (error) {
      throw new ValidationError(error.details);
    }

    const book = await BookService.findById(value.id);

    return res.status(200).json({
      data: book,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        error: error.name,
        details: error.message,
      });
    }

    res.status(500).json({
      message: error.name,
      details: error.message,
    });

    return next(error);
  }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
  try {
    const { error, value } = BookValidation.updateById(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const updatedBook = await BookService.updateById(value);

    return res.status(200).json({
      data: updatedBook,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }

    res.status(500).json({
      message: error.name,
      details: error.message,
    });

    return next(error);
  }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
  try {
    const { error, value } = BookValidation.deleteById(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const deletedBook = await BookService.deleteById(value.id);

    return res.status(200).json({
      data: deletedBook,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        message: error.name,
        details: error.message,
      });
    }

    res.status(500).json({
      message: error.name,
      details: error.message,
    });

    return next(error);
  }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function upload(req, res, next) {
  try {
    if (req.file === undefined) {
      throw new Error('Please, upload a CSV file!');
    }

    fs.createReadStream(path.resolve(__dirname, '../../', 'resources/uploads', req.file.filename))
      .pipe(csv.parse())
      .on('error', (error) => { throw new Error(error.details); })
      .on('data', (row) => {
        const BookLayout = {
          code3: row[0],
          title: row[1],
          description: row[2],
        };

        BookService.create(BookLayout);
      })
      .on('end', (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
        return res.status(200).json({ data: { message: 'Data from CSV file was been saved on database' } });
      });
  } catch (error) {
    res.status(500).json({
      message: error.name,
      details: error.message,
    });

    return next(error);
  }
}

module.exports = {
  findAll,
  findById,
  updateById,
  deleteById,
  upload,
};
