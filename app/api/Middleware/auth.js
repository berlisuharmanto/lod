const AuthenticationError = require('../errors/AuthenticationError');
const userService = require('../services/UserService');
const jwt = require('jsonwebtoken');

const authenticate = async (req,res,next) => {
    try {
        const bearerToken = req.headers?.authorization;
        if (!bearerToken) {
            throw new AuthenticationError('Authentication failed');
        }
        const token = bearerToken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userService.getById(decoded.id);
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
};

module.exports = authenticate;