const bcrypt = require('bcrypt');
const { createToken } = require('../../utils/tokenManager');
const UserService = require('../../Services/UserService');
const CartService = require('../../Services/CartService');
const authValidation = require('../../Validations/auth');
const jwt = require('jsonwebtoken');
const AuthenticateError = require('../../Exceptions/AuthenticationError');

exports.register = async (req, res, next) => {
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

        console.log(newUser);

        const userWithoutPassword = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            address: newUser.address
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
        next(error);
    }
};

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
            email: user.email,
            address: user.address
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

exports.getOrder = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userService = new UserService();
        const user = await userService.getById(decoded.id);

        const cartService = new CartService();
        const cart = await cartService.get(decoded.id);

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            cart: cart
        };

        return res.status(200).json({
            message: 'Successfully get user',
            data: userWithoutPassword
        });
    } catch (error) {
        next(error);
    }
}