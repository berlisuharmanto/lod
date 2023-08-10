const {PrismaClient, Prisma} = require('@prisma/client');

const prisma = new PrismaClient();

class Menu {
    async get() {
        const results = await prisma.Menu.findMany();

        return results;
    }

    async getById(id) {
        try {
            const menu = await prisma.Menu.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            if (!menu) {
                throw new Error('Tidak ada makanan dengan id tersebut');
            }

            return menu;
        } catch (error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new Error('Tidak ada makanan dengan id tersebut');
                }
            }
        }
    }

    async insert({req}) {
        const menu = new prisma.Menu.create({
            data: {
                name: req.name,
                price: req.price,
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
                }
            });

            return menu;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new Error('Tidak ada makanan dengan id tersebut');
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
                    throw new Error('Tidak ada makanan dengan id tersebut');
                }
            }
        }
    }
}

module.exports = Menu;