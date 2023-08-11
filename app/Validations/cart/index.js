const { VALIDATION_ERR } = require('../../Constants/errorType');
const InvariantError = require('../../Exceptions/InvariantError');

const { insert, update } = require('./schema');

const cartValidation = {
    validateInsert: (payload) => {
        const validationResult = insert.validate(payload);

        const { menuId, quantity } = payload;

        if (menuId < 1) {
            throw new InvariantError('Menu id must be greater than 0', VALIDATION_ERR);
        }

        if (quantity < 1) {
            throw new InvariantError('Quantity must be greater than 0', VALIDATION_ERR);
        }

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
        }
    },

    validateUpdate: (payload) => {
        const validationResult = update.validate(payload);

        const { menuId, quantity } = payload;

        if (menuId < 1) {
            throw new InvariantError('Menu id must be greater than 0', VALIDATION_ERR);
        }

        if (quantity < 1) {
            throw new InvariantError('Quantity must be greater than 0', VALIDATION_ERR);
        }

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
        }
    }
}

module.exports = cartValidation;