import { Request, Response } from 'express';
import TaskRepository from '../repositories/TaskRepository';

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

    async createTask(req: Request, res: Response) {
        const task = await TaskRepository.createTask(req.body);
        res.status(201).json(task);
    }

    async updateTask(req: Request, res: Response) {
        const { id } = req.params;
        const updatedTask = await TaskRepository.updateTask(id, req.body);
        res.json(updatedTask);
    }

    async deleteTask(req: Request, res: Response) {
        const { id } = req.params;
        await TaskRepository.deleteTask(id);
        res.status(204).send();
    }
}

export default new TaskController(); 