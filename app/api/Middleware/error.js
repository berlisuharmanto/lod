const NotFoundError = require('../../Exceptions/NotFoundError');
const { errorResponse } = require('../../utils/errorResponse');

exports.notFound = (req, res, next) => {
    next(new NotFoundError());
}

exports.error = (err, req, res, next) => {
    return errorResponse(res, err);
}