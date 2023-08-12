const { PrismaClient, Prisma } = require('@prisma/client');
const NotFoundError = require('../Exceptions/NotFoundError');

const prisma = new PrismaClient();

class Transaction {
    async get(userId) {
        const results = await prisma.Transaction.findMany({
            where: {
                userId: parseInt(userId)
            },
            include: {
                user: true,
                transactionList: true
            }
        });

        return results;
    }

    async getById(id) {
        const transaction = await prisma.Transaction.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                user: true,
                transactionList: true
            }
        });

        if (!transaction) {
            throw new NotFoundError('Not found');
        }

        return transaction;
    }

    async insert({ req }) {
        const transaction = await prisma.Transaction.create({
            data: {
                userId: parseInt(req.userId),
                totalPrice: parseInt(req.totalPrice),
            }
        });
        
        const transactionList = await prisma.Transaction_List.createMany({
            data: req.transactionList.map((item) => {
                return {
                    transactionId: transaction.id,
                    quantity: item.quantity,
                    price: item.price,
                    name: item.name
                }
            })
        });

        return transaction;
    }

    async delete(id) {
        try {
            const transaction = await prisma.Transaction.delete({
                where: {
                    id: parseInt(id)
                }
            });

            return transaction;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError('Not found');
                }
            }
        }
    }
}

module.exports = Transaction;