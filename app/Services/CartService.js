const { PrismaClient, Prisma } = require('@prisma/client');
const NotFoundError = require('../Exceptions/NotFoundError');
const InvariantError = require('../Exceptions/InvariantError');

const prisma = new PrismaClient();

class Cart {
    async get(userId) {
        const results = await prisma.Cart.findMany({
            where: {
                userId: parseInt(userId)
            }
        });

        return results;
    }

    async getById(id, userId) {
        const cart = await prisma.Cart.findUnique({
            where: {
                id: parseInt(id),
                userId: parseInt(userId)
            }
        });
        if (!cart) {
            throw new NotFoundError('Not found');
        }

        return cart;
    }

    async insert({ req }) {
        const menu = await prisma.Menu.findUnique({
            where: {
                id: req.menuId
            }
        });

        if (!menu) {
            throw new NotFoundError('Not found');
        }

        if (menu.quantity < req.quantity) {
            throw new InvariantError('Not enough quantity');
        }

        const cart = await prisma.Cart.create({
            data: {
                menuId: req.menuId,
                quantity: req.quantity,
                userId: req.userId
            }
        });

        return cart;
    }

    async update(id, userId, { req }) {
        try {
            const cart = await prisma.Cart.update({
                where: {
                    id: parseInt(id),
                    userId: parseInt(userId)
                },
                data: {
                    menuId: req.menuId,
                    quantity: req.quantity
                }
            });

            return cart;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError('Not found');
                }
            }
        }
    }

    async delete(id, userId) {
        try {
            const cart = await prisma.Cart.delete({
                where: {
                    id: parseInt(id),
                    userId: parseInt(userId)
                }
            });

            return cart;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError('Not found');
                }
            }
        }
    }

    async checkout(userId) {
        const carts = await prisma.Cart.findMany({
            where: {
                userId: parseInt(userId)
            },
            include: {
                menu: true
            }
        });

        const totalPrice = carts.reduce((total, cart) => {
            return total + cart.quantity * cart.menu.price;
        }, 0);

        const order = {
            carts : carts.map(cart => {
                return {
                    name: cart.menu.name,
                    quantity: cart.quantity,
                    price: cart.menu.price * cart.quantity
                };
            }),
            totalPrice
        };

        for (const cart of carts) {
            const menu = await prisma.Menu.findUnique({
                where: {
                    id: cart.menuId
                }
            });

            if (menu.quantity < cart.quantity) {
                throw new InvariantError('Not enough quantity');
            }

            await prisma.Menu.update({
                where: {
                    id: cart.menuId
                },
                data: {
                    quantity: menu.quantity - cart.quantity
                }
            });
        }

        await prisma.Cart.deleteMany({
            where: {
                userId: parseInt(userId)
            }
        });

        return order;
    }
}

module.exports = Cart;