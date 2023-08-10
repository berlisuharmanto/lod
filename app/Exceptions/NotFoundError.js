const { NOT_FOUND_ERR_MSG } = require('../constants/errorMessage');
const { NOT_FOUND_ERR } = require('../constants/errorType');

const ClientError = require('./ClientError');

class NotFoundError extends ClientError {
    name;

    constructor(message = NOT_FOUND_ERR_MSG) {
        super(message, 404, NOT_FOUND_ERR);
        this.name = 'Not Found Error';
    }
}

module.exports = NotFoundError;