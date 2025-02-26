import { PrismaClient } from '@prisma/client';
import { ProjectData } from '../types/projectTypes';

const prisma = new PrismaClient();

class ProjectRepository {
    async getAllProjects() {
        return await prisma.projects.findMany();
    }

    async getProjectById(id: string) {
        return await prisma.projects.findUnique({
            where: { id },
        });
    }

    async createProject(projectData: ProjectData) {
        return await prisma.projects.create({
            data: projectData,
        });
    }

    async updateProject(id: string, projectData: Partial<ProjectData>) {
        return await prisma.projects.update({
            where: { id },
            data: projectData,
        });
    }

    async deleteProject(id: string) {
        return await prisma.projects.delete({
            where: { id },
        });
    }
}

export default new ProjectRepository(); 