const Validation = require('../validation');

class BookValidation extends Validation {
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

    findById(data) {
        return this.Joi
          .object({
            id: this.Joi.objectId(),
          })
          .validate(data);
    }

    deleteById(data) {
        return this.Joi
          .object({
            id: this.Joi.objectId(),
          })
          .validate(data);
      }
}

module.exports = new BookValidation();