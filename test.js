const Joi = require('joi');

const schema = Joi.object().keys({
    password1: Joi.string().required(),
    password2: Joi.valid(Joi.ref('password1')).required(),
    refresh: [Joi.string(), Joi.number()],
}).xor('refresh');

const result = schema.validate({
    password1: '12345',
    password2: '12345',
    refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWI3ZTA4NDE1MGIzYjYzN2JmZTZiMTUiLCJpYXQiOjE2Mzk2NzIwMTUsImV4cCI6MTYzOTY3OTIxNX0.c7D7P6PzS-xyQDlE8zpQhg2BGLbRe4-x6Rb2Vlb8aS0',
});

console.log(result);
