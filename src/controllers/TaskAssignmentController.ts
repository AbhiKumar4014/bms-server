import { Request, Response } from 'express';
import TaskAssignmentRepository from '../repositories/TaskAssignmentRepository';
import { AuthenticatedRequest } from '../types/RequestTypes';

class TaskAssignmentController {
    async listTaskAssignments(req: Request, res: Response) {
        const taskAssignments = await TaskAssignmentRepository.getAllTaskAssignments();
        res.json(taskAssignments);
    }

    async getTaskAssignment(req: Request, res: Response) {
        const { id } = req.params;
        const taskAssignment = await TaskAssignmentRepository.getTaskAssignmentById(id);
        if (taskAssignment) {
            res.json(taskAssignment);
        } else {
            res.status(404).send('Task Assignment not found');
        }
    }

    async createTaskAssignment(req: Request, res: Response) {
        const taskAssignment = await TaskAssignmentRepository.createTaskAssignment(req.body);
        res.status(201).json(taskAssignment);
    }

    async updateTaskAssignment(req: Request, res: Response) {
        const { id } = req.params;
        const updatedTaskAssignment = await TaskAssignmentRepository.updateTaskAssignment(id, req.body);
        res.json(updatedTaskAssignment);
    }

    async deleteTaskAssignment(req: Request, res: Response) {
        const { id } = req.params;
        await TaskAssignmentRepository.deleteTaskAssignment(id);
        res.status(204).send();
    }
}

export default new TaskAssignmentController(); 