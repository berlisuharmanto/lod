const NotFoundError = require('../../Exceptions/NotFoundError');
const { errorRes } = require('../../utils/errorResponse');

exports.notFound = (req, res, next) => {
    next(new NotFoundError());
}

exports.error = (err, req, res, next) => {
    return errorRes(res, err);
}