const { PrismaClient, Prisma } = require('@prisma/client');
const NotFoundError = require('../Exceptions/NotFoundError');
const AuthenticateError = require('../Exceptions/AuthenticationError');

const prisma = new PrismaClient();

class User {
    async get() {
        const results = await prisma.User.findMany();

        return results;
    }

    async getByEmail(email) {
        const user = await prisma.User.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new AuthenticateError('Email or password is wrong');
        }

        return user;
    }

    async getById(id) {
        try {
            const user = await prisma.User.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            if (!user) {
                throw new NotFoundError('Not found');
            }

            return user;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError('Not found');
                }
            }
        }
    }

    async insert({ req }) {
        try {
            const user = await prisma.User.create({
                data: {
                    name: req.name,
                    email: req.email,
                    password: req.password
                }
            });
    
            return user;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new AuthenticateError('Email already exists');
                }
            }
        }
    }

    async update(id, { req }) {
        try {
            const user = await prisma.User.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name: req.name,
                    password: req.password,
                }
            });

            return user;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError('Not found');
                }
            }
        }
    }

    //ONE TIME USE ONLY!!!
    //DELETE THIS FUNCTION AFTER USE!!!
    async makeSuperAdmin(id) {
        const role = await prisma.Role.findUnique({
            where: {
                id: 1
            }
        });

        if (!role) {
            const newRole = await prisma.Role.create({
                data: {
                    name: 'super-admin'
                }
            });
        }

        const roleUser = await prisma.Role_User.create({
            data: {
                userId: parseInt(id),
                roleId: 1
            }
        });

        return roleUser;
    }

    async makeAdmin(id) {
        const role = await prisma.Role.findUnique({
            where: {
                id: 2
            }
        });

        if (!role) {
            const newRole = await prisma.Role.create({
                data: {
                    name: 'admin'
                }
            });
        }

        const roleUser = await prisma.Role_User.create({
            data: {
                userId: parseInt(id),
                roleId: 2
            }
        });
        
        return roleUser;
    }

    async getAdmin(id) {
        const users = await prisma.Role_User.findMany({
            where: {
                userId: parseInt(id),
            }
        });

        return users;
    }

    async removeRole(id) {
        const user = await prisma.User.update({
            where: {
                id: parseInt(id)
            },
            data: {
                role: null
            }
        });

        return user;
    }

    async delete(id) {
        try {
            const user = await prisma.User.delete({
                where: {
                    id: parseInt(id)
                }
            });

            return user;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError('Not found');
                }
            }
        }
    }
}

module.exports = User;