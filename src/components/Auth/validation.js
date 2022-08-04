const Validation = require('../validation');

class AuthValidation extends Validation {
    signUp(newProfile) {
        return this.Joi
            .object({
                email: this.Joi
                    .string()
                    .email()
                    .required(),
                nickName: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
                password: this.Joi
                    .string()
                    .min(6)
                    .max(100)
                    .pattern(/^[a-zA-Z ]/)
                    .trim()
                    .required()
            })
            .validate(newProfile);
    }

    logIn(credentials) {
        return this.Joi
            .object({
                nickName: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
                password: this.Joi
                    .string()
                    .min(6)
                    .max(100)
                    .required()
            })
            .validate(credentials);
    }

    Token(headers) {
        return this.Joi
          .object({
            authorization: this.Joi
              .string()
              .required(),
          })
          .validate(headers);
      }
}

module.exports = new AuthValidation();