import { PrismaClient } from '@prisma/client';
import { WorkLogData } from '../types/workLogTypes';

const prisma = new PrismaClient();

class WorkLogRepository {
    async getAllWorkLogs() {
        return await prisma.work_logs.findMany();
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