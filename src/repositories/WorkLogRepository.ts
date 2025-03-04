import { PrismaClient } from '@prisma/client';
import { WorkLogData } from '../types/workLogTypes';

const prisma = new PrismaClient();

class WorkLogRepository {
    async getAllWorkLogs() {
        return await prisma.work_logs.findMany();
    }

    async getUserWorkLogs(userId: string) {
        return await prisma.work_logs.findMany({
            where: { user_id: userId },
            select: {
                id: true,
                user_id: true,
                project_id: true,
                task_id: true,
                tasks: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        project_id: true,
                        status: true,
                    }
                },
                work_date: true,
                hours_worked: true,
                notes: true,
                comments: true,
                status: true,
            },
        });
    }

    async getWorkLogById(id: string) {
        return await prisma.work_logs.findUnique({
            where: { id },
        });
    }

    async createWorkLog(workLogData: WorkLogData) {
        return await prisma.work_logs.create({
            data: workLogData,
        });
    }

    async updateWorkLog(id: string, workLogData: Partial<WorkLogData>) {
        return await prisma.work_logs.update({
            where: { id },
            data: workLogData,
        });
    }

    async deleteWorkLog(id: string) {
        return await prisma.work_logs.delete({
            where: { id },
        });
    }
}

export default new WorkLogRepository();