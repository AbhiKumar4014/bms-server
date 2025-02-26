import { PrismaClient } from '@prisma/client';
import { DepartmentData } from '../types/departmentTypes';

const prisma = new PrismaClient();

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
}

export default new DepartmentRepository(); 