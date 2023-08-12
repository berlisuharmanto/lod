const { VALIDATION_ERR } = require('../../Constants/errorType');
const InvariantError = require('../../Exceptions/InvariantError');

const { insert } = require('./schema');

const transactionValidation = {
    validateInsert: (payload) => {
        const validationResult = insert.validate(payload);

        if (payload.transactionList.length === 0) {
            throw new InvariantError('Transaction list is empty', VALIDATION_ERR);
        }

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
        }
    }
}

module.exports = transactionValidation;