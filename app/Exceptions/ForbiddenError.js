const { FORBIDDES_ERR_MSG } = require('../Constants/errorMessage');
const { FORBIDDEN_ERR } = require('../Constants/errorType');

const ClientError = require('./ClientError');

class ForbiddenError extends ClientError {
    name;

    constructor(message = FORBIDDES_ERR_MSG) {
        super(message, 403, FORBIDDEN_ERR);
        this.name = 'Forbidden Error';
    }
}