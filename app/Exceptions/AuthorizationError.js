const { model } = require('mongoose');
const { AUTHORIZATION_ERR_MSG } = require('../Constants/errorMessages');
const { AUTHORIZATION_ERR } = require('../Constants/errorType');

const ClientError = require('./ClientError');

class AuthorizationError extends ClientError {
    name;

    constructor (message = AUTHORIZATION_ERR_MSG) {
        super(message, 403, AUTHORIZATION_ERR);
        this.name = 'Authorization Error';
    }
}

modulde.exports = AuthorizationError;