const CartService = require('../../Services/CartService');
const MenuService = require('../../Services/MenuService');
const UserService = require('../../Services/UserService');
const cartValidation = require('../../Validations/cart');
const jwt = require('jsonwebtoken');

exports.get = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const userService = new UserService();

        const user = await userService.getById(userId);

        const cartService = new CartService();
        const carts = await cartService.get(userId);

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
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            data: data
        });
    } catch (error) {
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { id } = req.params;

        const cartService = new CartService();
        const cart = await cartService.getById(id, userId);

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

        const token = req.headers?.authorization?.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;

        const cartService = new CartService();
        const cart = await cartService.insert({
            req: {
                menuId,
                quantity,
                userId: userId
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

        const token = req.headers?.authorization?.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;

        const cartService = new CartService();
        const cart = await cartService.update(id, userId, {
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

        const token = req.headers?.authorization?.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;

        const cartService = new CartService();
        const cart = await cartService.delete(id, userId);

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
        const token = req.headers?.authorization?.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;
        const userService = new UserService();
        const user = await userService.getById(userId);

        const cartService = new CartService();
        const cart = await cartService.checkout(userId);

        return res.status(200).json({
            message: 'Successfully checkout cart',
            user: {
                name: user.name,
                email: user.email,
            },
            data: cart
        });
    } catch (error) {
        next(error);
    }
}