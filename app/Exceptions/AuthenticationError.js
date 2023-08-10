const { AUTH_ERR_MSG } = require('../Constants/errorMessages');
const { AUTH_ERR } = require('../Constants/errorType');

const ClientError = require('./ClientError');

class AuthenticationError extends ClientError {
    name;

    constructor(message = AUTH_ERR_MSG) {
        super(message, 401, AUTH_ERR);
        this.name = 'Authentication Error';
    }
}

module.exports = AuthenticationError;