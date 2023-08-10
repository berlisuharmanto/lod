const { CLIENT_ERR_MSG } = require('../Constants/errorMessages');
const { CLIENT_ERR } = require('../Constants/errorType');

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