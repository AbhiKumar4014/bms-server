import { prisma } from '../app';
import { TaskAssignmentData } from '../types/taskAssignmentTypes';

class TaskAssignmentRepository {
    async getAllTaskAssignments() {
        return await prisma.task_assignments.findMany();
    }

    async getTaskAssignmentById(id: string) {
        return await prisma.task_assignments.findUnique({
            where: { id },
        });
    }

    async createTaskAssignment(taskAssignmentData: TaskAssignmentData) {
        return await prisma.task_assignments.create({
            data: taskAssignmentData,
        });
    }

    async updateTaskAssignment(id: string, taskAssignmentData: Partial<TaskAssignmentData>) {
        return await prisma.task_assignments.update({
            where: { id },
            data: taskAssignmentData,
        });
    }

    async deleteTaskAssignment(id: string) {
        return await prisma.task_assignments.delete({
            where: { id },
        });
    }
}

export default new TaskAssignmentRepository();