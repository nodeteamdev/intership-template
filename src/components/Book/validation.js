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
    checkId(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }

    /**
     * @param {String} data.title - objectId
     * @returns
     * @memberof BookValidation
     */
    checkTitle(data) {
        return this.Joi
            .object({
                title: this.Joi
                    .string()
                    .min(1)
                    .max(256)
                    .required(),
            })
            .validate(data);
    }

    /**
     * @param {String} profile.title
     * @param {String} profile.desc - description
     * @returns
     * @memberof BookValidation
     */
    create(profile) {
        return this.Joi
            .object({
                title: this.Joi
                    .string()
                    .min(1)
                    .max(256)
                    .required(),
                desc: this.Joi
                    .string()
                    .min(1)
                    .required(),
            })
            .validate(profile);
    }

    /**
     * @param {String} data.id - objectId
     * @param {String} data.title
     * @param {String} data.desc - description
     * @returns
     * @memberof BookValidation
     */
    updateByTitle(data) {
        return this.Joi
            .object({
                title: this.Joi
                    .string()
                    .min(1)
                    .max(256)
                    .required(),
                desc: this.Joi
                    .string()
                    .min(1)
                    .required(),
            })
            .validate(data);
    }
}

module.exports = new BookValidation();
