const MenuService = require('../../Services/MenuService');
const menuValidation = require('../../Validations/menu');

exports.get = async (req, res) => {
    try {
        const menuService = new MenuService();
        const menus = await menuService.get();

        return res.status(200).json({
            message: 'Successfully get menus',
            data: menus
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

        const menuService = new MenuService();
        const menu = await menuService.getById(id);

        return res.status(200).json({
            message: 'Successfully get menu',
            data: menu
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.insert = async (req, res) => {
    try {
        menuValidation.validateInsert(req.body);

        const { name, price, quantity } = req.body;

        const menuService = new MenuService();
        const menu = await menuService.insert({
            req: {
                name,
                price,
                quantity
            }
        });

        return res.status(201).json({
            message: 'Successfully created menu',
            data: menu
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.update = async (req, res) => {
    try {
        menuValidation.validateUpdate(req.body);

        const { id } = req.params;
        const { name, price } = req.body;

        const menuService = new MenuService();
        const menu = await menuService.update(id, {
            req: {
                name,
                price
            }
        });

        return res.status(200).json({
            message: 'Successfully updated menu',
            data: menu
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

        const menuService = new MenuService();
        const menu = await menuService.delete(id);

        return res.status(200).json({
            message: 'Successfully deleted menu',
            data: menu
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}