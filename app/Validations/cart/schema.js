const Joi = require('joi');

const insert = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    userId: Joi.number().required()
});

const update = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
});

module.exports = {
    insert,
    update
};