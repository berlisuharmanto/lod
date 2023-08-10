const Joi = require('joi');

const login = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {
    login
};
