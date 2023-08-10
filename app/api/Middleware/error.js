const NotFoundError = require('.../Exceptions/NotFoundError');
const AuthenticationError = require('.../Exceptions/AuthenticationError');
const AuthorizationError = require('.../Exceptions/AuthorizationError');

exports.notFound = (req, res, next) => {
    next(new NotFoundError());
}

exports.authentication = (err, req, res, next) => {
    if (err instanceof AuthenticationError) {
        res.status(401).json({
            status: 'fail',
            message: err.message
        });
    }
    next(err);
}

exports.error = (err, req, res, next) => {
    return res.status(err.status || 500).json({
        status: 'fail',
        message: "Internal Server Error"
    });
}