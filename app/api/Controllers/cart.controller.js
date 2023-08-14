const CartService = require('../../Services/CartService');
const MenuService = require('../../Services/MenuService');
const UserService = require('../../Services/UserService');
const TransactionService = require('../../Services/TransactionService');
const transactionValidation = require('../../Validations/transaction');
const cartValidation = require('../../Validations/cart');
const jwt = require('jsonwebtoken');

exports.get = async (req, res, next) => {
    try {
        const user = req.user;

        const cartService = new CartService();
        const carts = await cartService.get(user.id);

        data = [];

        for (const cart of carts) {
            const menuService = new MenuService();
            const menu = await menuService.getById(cart.menuId);
    
            data.push({
                id: cart.id,
                menu: {
                    id: menu.id,
                    name: menu.name,
                    price: menu.price,
                },
                totalPrice: menu.price * cart.quantity,
                quantity: cart.quantity,
                createdAt: cart.createdAt,
                updatedAt: cart.updatedAt,
            });
        }

        return res.status(200).json({
            message: 'Successfully get carts',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                },
                data
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const user = req.user.id;

        const { id } = req.params;

        const cartService = new CartService();
        const cart = await cartService.getById(id, user.id);

        return res.status(200).json({
            message: 'Successfully get cart',
            data: cart
        });
    } catch (error) {
        next(error);
    }
}

exports.insert = async (req, res, next) => {
    try {
        cartValidation.validateInsert(req.body);

        const { menuId, quantity } = req.body;

        const user = req.user;

        const cartService = new CartService();
        const cart = await cartService.insert({
            req: {
                menuId,
                quantity,
                userId: user.id
            }
        });

        return res.status(201).json({
            message: 'Successfully created cart',
            data: cart
        });
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        cartValidation.validateUpdate(req.body);

        const { id } = req.params;
        const { menuId, quantity } = req.body;

        const user = req.user;

        const cartService = new CartService();
        const cart = await cartService.update(id, user.id, {
            req: {
                menuId,
                quantity
            }
        });

        return res.status(200).json({
            message: 'Successfully updated cart',
            data: cart
        });
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = req.user;

        const cartService = new CartService();
        const cart = await cartService.delete(id, user.id);

        return res.status(200).json({
            message: 'Successfully delete cart',
            data: cart
        });
    } catch (error) {
        next(error);
    }
}

exports.checkout = async (req, res, next) => {
    try {
        const userService = new UserService();
        const user = req.user;

        const userUpdate = await userService.update(user.id, {
            req: {
                name: user.name,
                email: user.email,
                address: req.body.address
            }
        });

        const cartService = new CartService();
        const carts = await cartService.get(user.id);

        const cartData = [];

        for (const cart of carts) {
            const menuService = new MenuService();
            const menu = await menuService.getById(cart.menuId);

            if (menu.stock < cart.quantity) {
                throw new Error('Stock is not enough');
            }

            cartData.push({
                name: menu.name,
                quantity: cart.quantity,
                price: menu.price * cart.quantity
            });
        }

        const transactionService = new TransactionService();
        transactionValidation.validateInsert({
            transactionList: cartData
        });
        const transaction = await transactionService.insert({
            req: {
                userId: user.id,
                totalPrice: cartData.reduce((total, cart) => {
                    return total + cart.price;
                }, 0),
                transactionList: cartData
            }
        });

        const cart = await cartService.checkout(user.id);

        const transactionSuccess = await transactionService.getById(transaction.id);

        return res.status(200).json({
            message: 'Successfully checkout cart',
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    address: userUpdate.address,
                },
                transactionList: transactionSuccess.transactionList,
                totalPrice: transactionSuccess.totalPrice
            }
        });
    } catch (error) {
        next(error);
    }
}