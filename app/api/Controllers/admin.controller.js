const UserService = require('../../Services/UserService');
const authValidation = require('../../Validations/admin');
const AuthenticateError = require('../../Exceptions/AuthenticationError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createToken } = require('../../utils/tokenManager');

exports.login = async (req, res, next) => {
    try {
        authValidation.validateLogin(req.body);

        const { email, password } = req.body;

        const userService = new UserService();
        const user = await userService.getByEmail(email);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new AuthenticateError('Email or password is wrong');
        }

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        const payload = {
            id: user.id,
            email: user.email
        };

        const token = createToken(payload);

        return res.status(200).json({
            message: 'Successfully logged in',
            data: userWithoutPassword,
            token: token
        });
    } catch (error) {
        next(error);
    }
}

exports.getMe = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userService = new UserService();
        const user = await userService.getById(decoded.id);

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        return res.status(200).json({
            message: 'Successfully get user',
            data: userWithoutPassword
        });
    } catch (error) {
        next(error);
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const userService = new UserService();
        const users = await userService.get();

        return res.status(200).json({
            message: 'Successfully get users',
            data: users.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role.map(role => role.roleId),
                    carts: user.cart,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            })
        });
    } catch (error) {
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const userService = new UserService();
        const user = await userService.getById(id);

        if (!user) throw new AuthenticateError('User not found');

        return res.status(200).json({
            message: 'Successfully get user',
            data: user
        });
    } catch (error) {
        next(error);
    }
}

exports.makeSuperAdmin = async (req, res, next) => {
    try {
        if (!req.user) throw new AuthenticateError('User not found');
        const userService = new UserService();
        const user = await userService.makeSuperAdmin(req.user.id);

        return res.status(200).json({
            message: 'Successfully make user super admin',
            data: user
        });
    } catch (error) {
        next(error);
    }
}

exports.makeAdmin = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const userService = new UserService();
        const user = await userService.makeAdmin(decoded.id);

        return res.status(200).json({
            message: 'Successfully make user admin',
            data: user
        });
    } catch (error) {
        next(error);
    }
}

exports.removeRole = async (req, res, next) => {
    try {
        const { id } = req.body;

        const userService = new UserService();
        const user = await userService.removeRole(id);

        return res.status(200).json({
            message: 'Successfully remove user role',
            data: user
        });
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const userService = new UserService();
        const user = await userService.delete(id);

        return res.status(200).json({
            message: 'Successfully delete user',
            data: user
        });
    } catch (error) {
        next(error);
    }
}