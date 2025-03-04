import { Request, Response } from 'express';
import DepartmentRepository from '../repositories/DepartmentRepository';
import logger from '../utils/logger';

class DepartmentController {
    async listDepartments(req: Request, res: Response) {
        const departments = await DepartmentRepository.getAllDepartments();
        res.json(departments);
    }

    async getDepartment(req: Request, res: Response) {
        const { id } = req.params;
        const department = await DepartmentRepository.getDepartmentById(id);
        if (department) {
            res.json(department);
        } else {
            res.status(404).send('Department not found');
        }
    }

    async createDepartment(req: Request, res: Response) {
        const department = await DepartmentRepository.createDepartment(req.body);
        res.status(201).json(department);
    }

    async updateDepartment(req: Request, res: Response) {
        const { id } = req.params;
        const updatedDepartment = await DepartmentRepository.updateDepartment(id, req.body);
        res.json(updatedDepartment);
    }

    async deleteDepartment(req: Request, res: Response) {
        const { id } = req.params;
        await DepartmentRepository.deleteDepartment(id);
        res.status(204).send();
    }

    async getDepartmentUsers(req: Request, res: Response) {
        const userId = req.userId;
        try {
            const users = await DepartmentRepository.getDepartmentUsers(userId);
            res.json(users);
        } catch (error) {
            logger.error(`Error in getUsersByDepartment: ${error instanceof Error ? error.message : error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new DepartmentController();