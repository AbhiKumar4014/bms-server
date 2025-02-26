import { prisma } from '../config/dbConfig';
import { UserData } from '../types/userTypes';
import logger from '../utils/logger';

class UserRepository {
    async getAllUsers() {
        try {
            return await prisma.users.findMany();
        } catch (error) {
            logger.error(`Error fetching users: ${error.message}`);
            throw error;
        }
    }

    async getUserById(id: string) {
        try {
            const user = await prisma.users.findUnique({
                where: { id },
            });
            return user;
        } catch (error) {
            logger.error(`Error fetching user by ID: ${error.message}`);
            throw error;
        }
    }

    async createUser(userData: UserData) {
        try {
            return await prisma.users.create({
                data: userData,
            });
        } catch (error) {
            logger.error(`Error creating user: ${error.message}`);
            throw error;
        }
    }

    async updateUser(id: string, userData: Partial<UserData>) {
        try {
            return await prisma.users.update({
                where: { id },
                data: userData,
            });
        } catch (error) {
            logger.error(`Error updating user: ${error.message}`);
            throw error;
        }
    }

    async deleteUser(id: string) {
        try {
            return await prisma.users.delete({
                where: { id },
            });
        } catch (error) {
            logger.error(`Error deleting user: ${error.message}`);
            throw error;
        }
    }
    async getUserByEmail(email: string) {
        try {
            return await prisma.users.findUnique({
                where: { email },
            });
        } catch (error) {
            logger.error(`Error fetching user by email: ${error.message}`);
            throw error;
        }
    }
}

export default new UserRepository(); 