import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import { AuthenticatedRequest} from '../middleware/authMiddleware';
import logger from '../utils/logger';

class UserController {
    async listUsers(req: AuthenticatedRequest, res: Response) {
        const id: string  = req.userId as string;
        try {
            const user = await UserRepository.getUserById(id);
        if (user.role === "admin"){
            const users = await UserRepository.getAllUsers();
            res.json(users);
        }
        return res.status(403).json({ error: "don't have permission to access to this api." });
        } catch (error) {
            logger.error(`Error listing users: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getUser(req: AuthenticatedRequest, res: Response) {
        const id  = req.userId as string;
        try {
            const user = await UserRepository.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: `User with ID ${id} not found.` });
            }
            res.json(user);
        } catch (error) {
            logger.error(`Error in getUser: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const user = await UserRepository.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            logger.error(`Error creating user: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateUser(req: AuthenticatedRequest, res: Response) {
        const id: string  = req.userId as string;
        try {
            const updatedUser = await UserRepository.updateUser(id, req.body);
            res.json(updatedUser);
        } catch (error) {
            logger.error(`Error updating user: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async deleteUser(req: AuthenticatedRequest, res: Response) {
        const id: string  = req.userId as string;
        try {
            await UserRepository.deleteUser(id);
            res.status(204).json({ message: 'User deleted successfully' });
        } catch (error) {
            logger.error(`Error deleting user: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new UserController(); 