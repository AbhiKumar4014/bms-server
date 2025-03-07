import { prisma } from '../app';
import { ProjectManagerData } from '../types/projectManagerTypes';

class ProjectManagerRepository {
    async getAllProjectManagers() {
        return await prisma.project_managers.findMany();
    }

    async getProjectManagerById(id: string) {
        return await prisma.project_managers.findUnique({
            where: { id },
        });
    }

    async createProjectManager(pmData: ProjectManagerData) {
        return await prisma.project_managers.create({
            data: pmData,
        });
    }

    async updateProjectManager(id: string, pmData: Partial<ProjectManagerData>) {
        return await prisma.project_managers.update({
            where: { id },
            data: pmData,
        });
    }

    async deleteProjectManager(id: string) {
        return await prisma.project_managers.delete({
            where: { id },
        });
    }
}

export default new ProjectManagerRepository();