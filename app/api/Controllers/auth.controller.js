const bcrypt = require('bcrypt');
const { createToken } = require('../../utils/tokenManager');
const UserService = require('../../Services/UserService');
const authValidation = require('../../Validations/auth');
const jwt = require('jsonwebtoken');
const AuthenticateError = require('../../Exceptions/AuthenticationError');

exports.register = async (req, res) => {
    try {
        authValidation.validateRegister(req.body);

        const { name, email, password } = req.body;

        const userService = new UserService();

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await userService.insert({ 
            req: {
                name,
                email,
                password: hashPassword
            }
        });

        const userWithoutPassword = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        };

        const payload = {
            id: newUser.id,
            email: newUser.email
        };

        const token = createToken(payload);

        return res.status(201).json({
            message: 'Successfully registered',
            data: userWithoutPassword,
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

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