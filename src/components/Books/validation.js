const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class BooksValidation extends Validation {
    /**
     * @param {String} data.skip
     * @param {String} data.limit
     * @returns
     * @memberof BooksValidation
     */

    findAll(data) {
        return this.Joi
            .object({
                skip: this.Joi.number().min(0).default(0),
                limit: this.Joi.number().min(1).default(10),
            })
            .validate(data);
    }

    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof BooksValidation
     */
    findById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }

    /**
     * @param {String} book.code3
     * @param {String} book.title
     * @returns
     * @memberof BooksValidation
     */
    create(book) {
        return this.Joi
            .object({
                code3: this.Joi.string().min(3).max(10),
                title: this.Joi
                    .string()
                    .min(1)
                    .max(30),
                description: this.Joi.string().min(10).max(300),
            })
            .validate(book);
    }

    /**
     * @param {String} data.skip
     * @param {String} data.limit
     * @returns
     * @memberof BooksValidation
     */
    getNewBooks(data) {
        return this.Joi
            .object({
                skip: this.Joi.number().min(0).default(0),
                limit: this.Joi.number().min(1).default(10),
            })
            .validate(data);
    }

    /**
     * @param {String} data.skip
     * @param {String} data.limit
     * @returns
     * @memberof BooksValidation
     */
    getGroupedByCountry(data) {
        return this.Joi
            .object({
                skip: this.Joi.number().min(0).default(0),
                limit: this.Joi.number().min(1).default(10),
            })
            .validate(data);
    }

    /**
     * @param {String} data.id - objectId
     * @param {String} data.code3
     * @param {String} data.title
     * @param {String} data.description
     * @returns
     * @memberof BooksValidation
     */
    updateById(data) {
        return this.Joi
            .object({
                _id: this.Joi.objectId(),
                code3: this.Joi.string().min(3).max(10),
                title: this.Joi
                    .string()
                    .min(1)
                    .max(30),
                description: this.Joi.string().min(10).max(300),
            })
            .validate(data);
    }
}

module.exports = new BooksValidation();
