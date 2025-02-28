import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import { AuthenticatedRequest} from '../types/RequestTypes';
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
        return res.status(403).json({ error: "you don't have permission to access this." });
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

    async listUsersByRole(req: Request, res: Response) {
        const { role } = req.query; // Get the role from query parameters
        try {
            const users = await UserRepository.getUsersByRole(role as string || "consultant"); // Fetch users by role
            res.json(users);
        } catch (error) {
            logger.error(`Error listing users by role: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getNotifications(req: AuthenticatedRequest, res: Response) {
        const id: string  = req.userId as string;
        try {
            const notifications = await UserRepository.getNotifications(id);
            res.json(notifications);
        } catch (error) {
            logger.error(`Error in getNotifications: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getNotificationsHistory (req: AuthenticatedRequest, res: Response) {
        const id: string  = req.userId as string;
        try {
            const notifications = await UserRepository.getNotificationsHistory(id);
            res.json(notifications);
        } catch (error) {
            logger.error(`Error in getNotificationsHistory: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateNotification(req: Request, res: Response) {
        const {id}  = req.params;
        try {
            const updatedNotification = await UserRepository.updateNotification(id);
            res.json(updatedNotification);
        } catch (error) {
            logger.error(`Error updating notification: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
    async createNotification(req: Request, res: Response) {
        // const userId: string = req.userId as string;
        try {
            const userId  = req.body.user_id;
            const notification = await UserRepository.createNotification(userId, req?.body?.message as string);
            res.status(201).json(notification);
        } catch (error: any) {
            logger.error(`Error creating notification: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getAssignedTasks(req: AuthenticatedRequest, res: Response) {
        const id: string  = req.userId as string;
        try {
            const tasks = await UserRepository.getAssignedTasks(id);
            res.json(tasks);
        } catch (error) {
            logger.error(`Error in getAssignedTasks: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getAllAssignedTasks(req: Request, res: Response) {
        try {
            const tasks = await UserRepository.getAllAssignedTasks();
            res.json(tasks);
        } catch (error) {
            logger.error(`Error in getAssignedTasks: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new UserController(); 