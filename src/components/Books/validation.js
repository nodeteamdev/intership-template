const Validation = require('../validation');

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
    findById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }

    /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @returns
     * @memberof UserValidation
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
     * @param {String} data.id - objectId
     * @param {String} data.fullName
     * @returns
     * @memberof UserValidation
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

    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
     */
}

module.exports = new UserValidation();
