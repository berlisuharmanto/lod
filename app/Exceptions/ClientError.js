const { CLIENT_ERR_MSG } = require('../constants/errorMessage');
const { CLIENT_ERR } = require('../constants/errorType');

class ClientError extends Error {
    statusCode;
    type;

    constructor(message, statusCode = 400, type = CLIENT_ERR) {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
    }
}

module.exports = ClientError;