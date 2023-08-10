const { VALIDATION_ERR }= require('../../Constants/errorType');
const InvariantError = require('../../Exceptions/InvariantError');

const { login } = require('./schema');

const authValidation = {
    validateLogin: (payload) => {
        const validationResult = login.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
        }
    }
}

module.exports = authValidation;