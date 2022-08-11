import Validation, { DataToValidate } from '../validation';

/**
 * @exports
 * @class
 * @extends Validation
 */
class UserValidation extends Validation {
    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
     */
    findById(data: DataToValidate) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }

    /**
     * @param {String} data.email
     * @param {String} data.fullName
     * @returns
     * @memberof UserValidation
     */
    create(data: DataToValidate) {
        return this.Joi
            .object({
                email: this.Joi
                    .string()
                    .email()
                    .required(),
                fullName: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
            })
            .validate(data);
    }

    /**
     * @param {String} data.id - objectId
     * @param {String} data.fullName
     * @returns
     * @memberof UserValidation
     */
    updateById(data: DataToValidate) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
                fullName: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
            })
            .validate(data);
    }

    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
     */
    deleteById(data: DataToValidate) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }
}

export default new UserValidation();
