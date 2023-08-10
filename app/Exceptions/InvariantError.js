const { INVARIANT_ERR_MSG } = require('../constants/errorMessage');
const { INVARIANT_ERR } = require('../constants/errorType');

const ClientError = require('./ClientError');

class InvariantError extends ClientError {
    name;

    constructor(message = INVARIANT_ERR_MSG) {
        super(message, 400, INVARIANT_ERR);
        this.name = 'Invariant Error';
    }
}

module.exports = InvariantError;