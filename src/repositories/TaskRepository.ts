import { PrismaClient } from '@prisma/client';
import { TaskData } from '../types/taskTypes';

const prisma = new PrismaClient();

class TaskRepository {
    async getAllTasks() {
        return await prisma.tasks.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                due_date: true,
                assigned_by: true,
                task_assignments: {
                    select: {
                        user_id: false,
                        users: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                employee_details: {
                                    select: {
                                        first_name: true,
                                        last_name: true,
                                        designation: true,
                                        department_id: true,
                                        emp_id: true,
                                    }
                                }
                            },
                        }
                    },
                },
                projects: { // Fetch related project details
                    select: {
                        id: true,
                        project_name: true
                    }
                },
                tasks: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                project_id: true,
                estimated_hours: true,
                start_date: true,
                due_date: true,
                created_at: true,
                updated_at: true,
            },
        });
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