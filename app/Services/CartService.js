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
                name: req.name,
                price: req.price,
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
                    name: req.name,
                    price: req.price,
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
}

module.exports = Cart;