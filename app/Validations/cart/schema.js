const Joi = require('joi');

const insert = Joi.object({
    menuId: Joi.number().required(),
    quantity: Joi.number().required()
});

const update = Joi.object({
    quantity: Joi.number().required()
});

module.exports = {
    insert,
    update
};