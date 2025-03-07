import { prisma } from '../app';

class DesignationRepository {
    async getDesignations() {
        return prisma.designation.findMany();
    }
}

export default new DesignationRepository();