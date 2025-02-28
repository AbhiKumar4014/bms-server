import { Request, Response } from 'express';
import ProjectRepository from '../repositories/ProjectRepository';
import logger from '../utils/logger';

class ProjectController {
    async listProjects(req: Request, res: Response) {
        const projects = await ProjectRepository.getAllProjects();
        res.json(projects);
    }

    async getProject(req: Request, res: Response) {
        const { id } = req.params;
        const project = await ProjectRepository.getProjectById(id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).send('Project not found');
        }
    }

    async createProject(req: Request, res: Response) {
        try {
            const project = await ProjectRepository.createProject(req.body);
            res.status(201).json(project);
        } catch (error) {
            logger.error(error);
            res.status(500).send('Error creating project');
        }
    }

    async updateProject(req: Request, res: Response) {
        const { id } = req.params;
        const updatedProject = await ProjectRepository.updateProject(id, req.body);
        res.json(updatedProject);
    }

    async deleteProject(req: Request, res: Response) {
        const { id } = req.params;
        await ProjectRepository.deleteProject(id);
        res.status(204).send();
    }
}

export default new ProjectController(); 
