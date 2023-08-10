const { AUTH_ERR_MSG } = require('../constants/errorMessage');
const { AUTH_ERR } = require('../constants/errorType');

const ClientError = require('./ClientError');

class AuthenticationError extends ClientError {
    name;

    constructor(message = AUTH_ERR_MSG) {
        super(message, 401, AUTH_ERR);
        this.name = 'Authentication Error';
    }
}

module.exports = AuthenticationError;