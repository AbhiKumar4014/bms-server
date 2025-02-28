import { PrismaClient } from '@prisma/client';
import { ProjectData } from '../types/projectTypes';

const prisma = new PrismaClient();

class ProjectRepository {
    async getAllProjects() {
        return await prisma.projects.findMany({
            select: {
                project_name: true,
                project_code: true,
                project_description: true,
                planned_start_date: true,
                planned_end_date: true,
                revised_planned_end_date: true,
                actual_start_date: true,
                actual_end_date: true,
                contracted_efforts: true,
                planned_efforts: true,
                po_number: true,
                po_amount: true,
                currency: true,
                po_start_date: true,
                po_end_date: true,
                po_validity: true,
                po_upliftment_details: true,
                comments: true,
                status: true,
                created_at: true,
                updated_at: true,
                client_id: true,
                clients: {
                    select: {
                        company_name: true,

                    }
                }
            }
        });
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