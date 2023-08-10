const {PrismaClient, Prisma} = require('@prisma/client');
const NotFoundError = require('../Exceptions/NotFoundError');

const prisma = new PrismaClient();

class Menu {
    async get() {
        const results = await prisma.Menu.findMany();

        return results;
    }

    async getById(id) {
        const menu = await prisma.Menu.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!menu) {
            throw new NotFoundError('Not found');
        }

        return menu;
    }

    async insert({req}) {
        const menu = await prisma.Menu.create({
            data: {
                name: req.name,
                price: req.price,
                quantity: req.quantity
            }
        });

        return menu;
    }

    async update(id, {req}) {
        try {
            const menu = await prisma.Menu.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name: req.name,
                    price: req.price,
                    quantity: req.quantity
                }
            });

            return menu;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError('Not found');
                }
            }
        }
    }

    async delete(id) {
        try{
            const menu = await prisma.Menu.delete({
                where: {
                    id: parseInt(id)
                }
            });
            
            return menu;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError('Not found');
                }
            }
        }
    }
}

module.exports = Menu;