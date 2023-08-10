const jwt = require('jsonwebtoken');

const { TOKEN_EXPIRED_ERR_MSG, TOKEN_INVALID_ERR_MSG } = require('.././Constants/errorMessages');
const { TOKEN_ERR } = require('.././Constants/errorType');

const invariantError = require('../Exceptions/InvariantError');

exports.createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}

exports.decodeToken = (token) => {
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                const error = new invariantError(TOKEN_ERR, TOKEN_INVALID_ERR_MSG);
                return reject(error);
            } else if(decoded.exp <= Date.now() / 1000) {
                const error = new invariantError(TOKEN_ERR, TOKEN_EXPIRED_ERR_MSG);
                return reject(error);
            }

            return resolve(decoded);
        });
    });
}