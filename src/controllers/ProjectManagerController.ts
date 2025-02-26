import { Request, Response } from 'express';
import ProjectManagerRepository from '../repositories/ProjectManagerRepository';

class ProjectManagerController {
    async listProjectManagers(req: Request, res: Response) {
        const pms = await ProjectManagerRepository.getAllProjectManagers();
        res.json(pms);
    }

    async getProjectManager(req: Request, res: Response) {
        const { id } = req.params;
        const pm = await ProjectManagerRepository.getProjectManagerById(id);
        if (pm) {
            res.json(pm);
        } else {
            res.status(404).send('Project Manager not found');
        }
    }

    async createProjectManager(req: Request, res: Response) {
        const pm = await ProjectManagerRepository.createProjectManager(req.body);
        res.status(201).json(pm);
    }

    async updateProjectManager(req: Request, res: Response) {
        const { id } = req.params;
        const updatedPm = await ProjectManagerRepository.updateProjectManager(id, req.body);
        res.json(updatedPm);
    }

    async deleteProjectManager(req: Request, res: Response) {
        const { id } = req.params;
        await ProjectManagerRepository.deleteProjectManager(id);
        res.status(204).send();
    }
}

export default new ProjectManagerController(); 