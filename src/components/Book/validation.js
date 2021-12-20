const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class BookValidation extends Validation {
  /**
   * @param {String} book.code3
   * @param {String} book.title
   * @param {String} book.description
   * @returns
   * @memberof BookValidation
   */
  create(book) {
    return this.Joi
      .object({
        code3: this.Joi
          .string()
          .uppercase()
          .trim()
          .max(3)
          .required(),
        title: this.Joi
          .string()
          .min(1)
          .max(36)
          .required(),
        description: this.Joi
          .string()
          .min(10)
          .required(),
        createdAt: this.Joi
          .date()
          .default(Date.now),
        updatedAt: this.Joi
          .date()
          .default(Date.now),
      })
      .validate(book);
  }

  /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof BookValidation
     */
  findById(data) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
      })
      .validate(data);
  }

  /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof BookValidation
     */
  deleteById(data) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
      })
      .validate(data);
  }
}

module.exports = new BookValidation();
