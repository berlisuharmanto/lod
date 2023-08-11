const { VALIDATION_ERR } = require('../../Constants/errorType');
const InvariantError = require('../../Exceptions/InvariantError');

const { insert, update } = require('./schema');

const menuValidation = {
    validateInsert: (payload) => {
        const validationResult = insert.validate(payload);

        const { name, price, quantity } = payload;

        const nameRegex = /^[a-zA-Z0-9 ]+$/;
        if (!nameRegex.test(name)) {
            throw new InvariantError('Name must be alphanumeric', VALIDATION_ERR);
        }

        if (price < 0) {
            throw new InvariantError('Price must be greater than 0', VALIDATION_ERR);
        }

        if (quantity < 0) {
            throw new InvariantError('Quantity must be greater than 0', VALIDATION_ERR);
        }

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
        }
    },

    validateUpdate: (payload) => {
        const validationResult = update.validate(payload);

        const { name, price, quantity } = payload;

        const nameRegex = /^[a-zA-Z0-9 ]+$/;
        if (!nameRegex.test(name)) {
            throw new InvariantError('Name must be alphanumeric', VALIDATION_ERR);
        }

        if (price < 0) {
            throw new InvariantError('Price must be greater than 0', VALIDATION_ERR);
        }

        if (quantity < 0) {
            throw new InvariantError('Quantity must be greater than 0', VALIDATION_ERR);
        }

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
        }
    }
}

module.exports = menuValidation;