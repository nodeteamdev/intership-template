const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class ProductValidation extends Validation {
    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof ProductValidation
     */
    findById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }

    /**
     * @param {String} data.name
     * @param {Number} data.price
     * @returns
     * @memberof ProductValidation
     */
    create(data) {
        return this.Joi
            .object({
                name: this.Joi
                    .string()
                    .required(),
                price: this.Joi
                    .number()
                    .required(),
            })
            .validate(data);
    }

    /**
     * @param {String} data.id - objectId
     * @param {String} data.name
     * @param {Number} data.price
     * @returns
     * @memberof ProductValidation
     */
    updateById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
                name: this.Joi
                    .string()
                    .required(),
                price: this.Joi
                    .number()
                    .required(),
            })
            .validate(data);
    }

    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof ProductValidation
     */
    deleteById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }
}

module.exports = new ProductValidation();
