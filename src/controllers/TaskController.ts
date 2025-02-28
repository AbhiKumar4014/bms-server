import { Request, Response } from 'express';
import TaskRepository from '../repositories/TaskRepository';
import { AuthenticatedRequest } from '../types/RequestTypes';
import logger from '../utils/logger';

class TaskController {
    async listTasks(req: Request, res: Response) {
        const tasks = await TaskRepository.getAllTasks();
        res.json(tasks);
    }

    async getTask(req: Request, res: Response) {
        const { id } = req.params;
        const task = await TaskRepository.getTaskById(id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).send('Task not found');
        }
    }

    async createTask(req: AuthenticatedRequest, res: Response) {
        const userId = req.userId;
        try {
            const task = await TaskRepository.createTask({assigned_by: userId, ...req?.body});
            res.status(201).json(task);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send(error.message);
            } else {
                res.status(500).send('An unexpected error occurred');
            }
        }
    }

    async updateTask(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const updatedTask = await TaskRepository.updateTask(id, req.body);
            res.json(updatedTask);
        } catch (error) {
            logger.error(error);
            if (error instanceof Error) {
                res.status(400).send(error.message);
            } else {
                res.status(500).send('An unexpected error occurred');
            }
        }
    }

    async deleteTask(req: Request, res: Response) {
        const { id } = req.params;
        await TaskRepository.deleteTask(id);
        res.status(204).send();
    }
}

export default new TaskController(); 