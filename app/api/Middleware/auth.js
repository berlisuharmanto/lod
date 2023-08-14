const AuthenticationError = require('../../Exceptions/AuthenticationError');
const UserService = require('../../Services/UserService');
const jwt = require('jsonwebtoken');

const authenticate = async (req,res,next) => {
    try {
        const bearerToken = req.headers?.authorization;

        if (!bearerToken) {
            throw new AuthenticationError('Unauthorized');
        }

        const token = bearerToken.split(' ')[1];

        if (token == "null") {
            throw new AuthenticationError('Unauthorized');
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userService = new UserService();
        const user = await userService.getById(decoded.id);
        if (!user) {
            throw new AuthenticationError('Unauthorized');
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authenticate;