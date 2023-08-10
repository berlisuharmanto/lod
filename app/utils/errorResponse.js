const { SERVER_ERR } = require('../Constants/errorType');
const ClientError = require('../Exceptions/ClientError');

const clientErrResponse = (error) => ({
    success: false,
    message: error.message,
    type: error.type,
});

const serverErrResponse = (error) => ({
    success: false,
    message: error.message,
    type: SERVER_ERR,
});

const errorResponse = (res, error) => { 
    if (error instanceof ClientError) {
        return res.status(error.statusCode).json(clientErrResponse(error));
    }
    return res.status(500).json(serverErrResponse(error));
};

module.exports = {
    errorResponse,
    serverErrResponse,
    clientErrResponse,
}