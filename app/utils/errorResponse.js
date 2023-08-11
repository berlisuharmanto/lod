const { SERVER_ERR } = require('../Constants/errorType');
const ClientError = require('../Exceptions/ClientError');

const clientErrRes = (error) => ({
    success: false,
    message: error.message,
    type: error.type
});
  
const serverErrRes = (error) => ({
    success: false,
    message: error.message,
    type: SERVER_ERR,
    error: process.env.NODE_ENV !== 'production' ? error.stack : undefined
});
  
const errorRes = (res, error) => {
    if (error instanceof ClientError) {
        return res.status(error.statusCode).json(clientErrRes(error));
    }

    return res.status(500).json(serverErrRes(error));
};
  
module.exports = {
    errorRes,
    clientErrRes,
    serverErrRes
}