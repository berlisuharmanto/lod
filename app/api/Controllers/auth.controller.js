const bcrypt = require('bcrypt');
const { createToken } = require('../../utils/tokenManager');
const UserService = require('../../Services/UserService');
const TransactionService = require('../../Services/TransactionService');
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
            token: token,
            token_expired: jwt.decode(token).exp
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
            token: token,
            token_expired: jwt.decode(token).exp
        });
    } catch (error) {
        next(error);
    }
}

exports.getMe = async (req, res, next) => {
    try {
        const user = req.user;

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address
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
        const user = req.user;

        const transactionService = new TransactionService();
        const transactions = await transactionService.get(user.id);

        const transactionWithoutPassword = [];

        for (const transaction of transactions) {
            transactionWithoutPassword.push({
                id: transaction.id,
                totalPrice: transaction.totalPrice,
                transactionList: transaction.transactionList,
                updatedAt: transaction.updatedAt
            });
        }

        return res.status(200).json({
            message: 'Successfully get transactions',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address
            },
            data: transactionWithoutPassword
        });
    } catch (error) {
        next(error);
    }
}