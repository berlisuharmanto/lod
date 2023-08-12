const MenuService = require('../../Services/MenuService');
const menuValidation = require('../../Validations/menu');

exports.get = async (req, res, next) => {
    try {
        const menuService = new MenuService();
        const menus = await menuService.get();

        return res.status(200).json({
            message: 'Successfully get menus',
            data: menus
        });
    } catch (error) {
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const menuService = new MenuService();
        const menu = await menuService.getById(id);

        return res.status(200).json({
            message: 'Successfully get menu',
            data: menu
        });
    } catch (error) {
        next(error);
    }
}

exports.insert = async (req, res, next) => {
    try {
        menuValidation.validateInsert(req.body);

        const { name, price, quantity, description } = req.body;

        const menuService = new MenuService();
        const menu = await menuService.insert({
            req: {
                name,
                price,
                quantity,
                description,
            }
        });

        return res.status(201).json({
            message: 'Successfully created menu',
            data: menu
        });
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        menuValidation.validateUpdate(req.body);

        const { id } = req.params;
        const { name, quantity, price } = req.body;

        const menuService = new MenuService();
        const menu = await menuService.update(id, {
            req: {
                name,
                quantity,
                price
            }
        });

        return res.status(200).json({
            message: 'Successfully updated menu',
            data: menu
        });
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const menuService = new MenuService();
        const menu = await menuService.delete(id);

        return res.status(200).json({
            message: 'Successfully deleted menu',
            data: menu
        });
    } catch (error) {
        next(error);
    }
}