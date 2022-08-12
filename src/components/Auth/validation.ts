import Validation, { DataToValidate } from '../validation';

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
    /**
     * @param {String} data.email
     * @param {String} data.password
     * @returns
     * @memberof AuthValidation
     */
    create(data: DataToValidate) {
        return this.Joi
            .object({
                email: this.Joi
                    .string()
                    .email()
                    .required(),
                password: this.Joi
                    .string()
                    .min(6)
                    .required(),
            })
            .validate(data);
    }

    /**
     * @param {String} data.id
     * @param {String} data.refreshToken
     * @returns
     * @memberof AuthValidation
     */
    refreshToken(data: DataToValidate) {
        return this.Joi
            .object({
                id: this.Joi
                    .objectId(),
                refreshToken: this.Joi
                    .string()
                    .required(),
            })
            .validate(data);
    }
}

export default new AuthValidation();
