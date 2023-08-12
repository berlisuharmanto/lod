const Joi = require('joi');

const insert = Joi.object({
    transactionList: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required()
    })).required(),
});

module.exports = {
    insert
};