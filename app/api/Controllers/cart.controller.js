const CartService = require('../../Services/CartService');
const MenuService = require('../../Services/MenuService');
const cartValidation = require('../../Validations/cart');

exports.get = async (req, res) => {
    try {
        const cartService = new CartService();
        const carts = await cartService.get();

        data = [];

        carts.forEach(async (cart) => {
            const menuService = new MenuService();
            const menu = await menuService.getById(cart.menuId);

            data.push({
                id: cart.id,
                menu: menu,
                quantity: cart.quantity,
                userId: cart.userId,
                createdAt: cart.createdAt,
                updatedAt: cart.updatedAt,
            });
        });
                

        return res.status(200).json({
            message: 'Successfully get carts',
            data: data
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

        const cartService = new CartService();
        const cart = await cartService.getById(id);

        return res.status(200).json({
            message: 'Successfully get cart',
            data: cart
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.insert = async (req, res) => {
    try {
        cartValidation.validateInsert(req.body);

        const { menuId, quantity } = req.body;

        const cartService = new CartService();
        const cart = await cartService.insert({
            req: {
                menuId,
                quantity,
                userId
            }
        });

        return res.status(201).json({
            message: 'Successfully created cart',
            data: cart
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.update = async (req, res) => {
    try {
        cartValidation.validateUpdate(req.body);

        const { id } = req.params;
        const { menuId, quantity } = req.body;

        const cartService = new CartService();
        const cart = await cartService.update(id, {
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
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const cartService = new CartService();
        const cart = await cartService.delete(id);

        return res.status(200).json({
            message: 'Successfully delete cart',
            data: cart
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.checkout = async (req, res) => {
    try {
        const cartService = new CartService();
        const cart = await cartService.checkout();

        return res.status(200).json({
            message: 'Successfully checkout cart',
            data: cart
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}