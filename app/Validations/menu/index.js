const { VALIDATION_ERR } = require('../../Constants/errorType');
const InvariantError = require('../../Exceptions/InvariantError');

const { insert, update } = require('./schema');

const menuValidation = {
    validateInsert: (payload) => {
        const validationResult = insert.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
        }
    },

    validateUpdate: (payload) => {
        const validationResult = update.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
        }
    }
}

module.exports = menuValidation;