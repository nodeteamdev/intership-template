import Validation, { DataToValidate } from '../validation';

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
    findById(data: DataToValidate) {
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
    create(data: DataToValidate) {
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
    updateById(data: DataToValidate) {
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
    deleteById(data: DataToValidate) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }
}

export default new ProductValidation();
