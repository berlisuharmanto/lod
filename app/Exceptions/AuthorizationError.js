const { model } = require('mongoose');
const { AUTHORIZATION_ERR_MSG } = require('../constants/errorTypes');
const { AUTHORIZATION_ERR } = require('../constants/errorTypes');

const ClientError = require('./ClientError');

class AuthorizationError extends ClientError {
    name;

    constructor (message = AUTHORIZATION_ERR_MSG) {
        super(message, 403, AUTHORIZATION_ERR);
        this.name = 'Authorization Error';
    }
}

modulde.exports = AuthorizationError;