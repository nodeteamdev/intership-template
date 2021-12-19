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
          .min(3)
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
        createAt: this.Joi
          .date()
          .default(() => moment().format(), 'date created'),
      })
      .validate(book);
  }

  /**
     * @param {String} data.id - objectId
     * @param {String} data.fullName
     * @returns
     * @memberof UserValidation
     */
  updateById(data) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
        firstName: this.Joi
          .string()
          .min(1)
          .max(30),
        lastName: this.Joi
          .string()
          .min(1)
          .max(30),
      })
      .validate(data);
  }

  /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
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
