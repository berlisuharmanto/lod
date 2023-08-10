const { PrismaClient, Prisma } = require('@prisma/client');
const NotFoundError = require('../Exception/NotFoundError');

const prisma = new PrismaClient();

class Cart {
    async get() {
        const results = await prisma.Cart.findMany();

        return results;
    }

    async getById(id) {
        const cart = await prisma.Cart.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!cart) {
            throw new NotFoundError('Not found');
        }

        return cart;
    }

    async insert({ req }) {
        const cart = await prisma.Cart.create({
            data: {
                menuId: req.menuId,
                quantity: req.quantity,
                userId: req.userId
            }
        });

        return cart;
    }

    async update(id, { req }) {
        try {
            const cart = await prisma.Cart.update({
                where: {
                    id: parseInt(id)
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

    async delete(id) {
        try {
            const cart = await prisma.Cart.delete({
                where: {
                    id: parseInt(id)
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
            }
        });

        const totalPrice = carts.reduce((total, cart) => {
            return total + cart.quantity * cart.Menu.price;
        }, 0);

        const order = {
            carts,
            totalPrice
        }

        carts.forEach(async cart => {
            const menu = await prisma.Menu.findUnique({
                where: {
                    id: cart.menuId
                }
            });

            if (menu.stock < cart.quantity) {
                throw new Error('Stock is not enough');
            }

            await prisma.Menu.update({
                where: {
                    id: cart.menuId
                },
                data: {
                    stock: menu.stock - cart.quantity
                }
            });
        });

        await prisma.Cart.deleteMany({
            where: {
                userId: parseInt(userId)
            }
        });

        return order;
    }
}

module.exports = Cart;