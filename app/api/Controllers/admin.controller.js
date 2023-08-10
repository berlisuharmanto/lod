const UserService = require('../../Services/UserService');
const authValidation = require('../../Validations/admin');
const AuthenticateError = require('../../Exceptions/AuthenticationError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createToken } = require('../../utils/tokenManager');

exports.login = async (req, res) => {
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
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getMe = async (req, res) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userService = new UserService();
        const user = await userService.getById(decoded.id);

        return res.status(200).json({
            message: 'Successfully get user',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const userService = new UserService();
        const users = await userService.get();

        return res.status(200).json({
            message: 'Successfully get users',
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const userService = new UserService();
        const user = await userService.getById(id);

        return res.status(200).json({
            message: 'Successfully get user',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.makeSuperAdmin = async (req, res) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userService = new UserService();
        const user = await userService.makeSuperAdmin(decoded.id);

        return res.status(200).json({
            message: 'Successfully make user super admin',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.makeAdmin = async (req, res) => {
    try {
        const { id } = req.body;

        const userService = new UserService();
        const user = await userService.makeAdmin(id);

        return res.status(200).json({
            message: 'Successfully make user admin',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.removeRole = async (req, res) => {
    try {
        const { id } = req.body;

        const userService = new UserService();
        const user = await userService.removeRole(id);

        return res.status(200).json({
            message: 'Successfully remove user role',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const userService = new UserService();
        const user = await userService.delete(id);

        return res.status(200).json({
            message: 'Successfully delete user',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}