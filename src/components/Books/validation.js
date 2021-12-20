const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class BookValidation extends Validation {
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
     * @param {String} profile.code3
     * @param {String} profile.description
     * @param {String} title
     * @returns
     * @memberof BookValidation
     */
    create(profile) {
        return this.Joi
            .object({
                code3: this.Joi.string()
                    .case('upper')
                    .min(3)
                    .max(3)
                    .required(),
                description: this.Joi
                    .string()
                    .min(1)
                    .max(163)
                    .required(),
                title: this.Joi.string()
                    .min(1)
                    .max(20)
                    .required(),
            })
            .validate(profile);
    }

    /**
     * @param {String} data.id - objectId
     * @param {String} profile.code3
     * @param {String} profile.description
     * @param {String} title
     * @returns
     * @memberof BookValidation
     */
    updateById(data) {
        return this.Joi
            .object({
                _id: this.Joi.objectId(),
                code3: this.Joi.string()
                    .case('upper')
                    .min(3)
                    .max(3),
                description: this.Joi
                    .string()
                    .min(1)
                    .max(163),
                title: this.Joi.string()
                    .min(1)
                    .max(20),
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
