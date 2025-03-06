import { prisma } from '../config/dbConfig';
import { DepartmentData } from '../types/departmentTypes';

class DepartmentRepository {
    async getAllDepartments() {
        return await prisma.departments.findMany();
    }

    async getDepartmentById(id: string) {
        return await prisma.departments.findUnique({
            where: { id },
        });
    }

    async createDepartment(departmentData: DepartmentData) {
        return await prisma.departments.create({
            data: departmentData,
        });
    }

    async updateDepartment(id: string, departmentData: Partial<DepartmentData>) {
        return await prisma.departments.update({
            where: { id },
            data: departmentData,
        });
    }

    async deleteDepartment(id: string) {
        return await prisma.departments.delete({
            where: { id },
        });
    }

    async getDepartmentUsers(userId: string) {
        const departmentData = await prisma.departments.findFirst({
            where: {
                employee_details: {
                    some: {
                        user_id: userId
                    }
                }
            },
            select: {
                id: true,
                name: true,
                employee_details: {
                    select: {
                        first_name: true,
                        last_name: true,
                        user_id: true
                    }
                }
            }
        });
        if (!departmentData) {
            return [];
        }

        return departmentData;
    }

}

export default new DepartmentRepository();