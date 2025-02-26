import { PrismaClient } from '@prisma/client';
import { TaskData } from '../types/taskTypes';

const prisma = new PrismaClient();

class TaskRepository {
    async getAllTasks() {
        return await prisma.tasks.findMany();
    }

    async getTaskById(id: string) {
        return await prisma.tasks.findUnique({
            where: { id },
        });
    }

    async createTask(taskData: TaskData) {
        return await prisma.tasks.create({
            data: taskData,
        });
    }

    async updateTask(id: string, taskData: Partial<TaskData>) {
        return await prisma.tasks.update({
            where: { id },
            data: taskData,
        });
    }

    async deleteTask(id: string) {
        return await prisma.tasks.delete({
            where: { id },
        });
    }
}

export default new TaskRepository(); 