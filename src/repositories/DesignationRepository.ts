import { prisma } from "../config/dbConfig";

class DesignationRepository {
    async getDesignations() {
        return prisma.designation.findMany();
    }
}

export default new DesignationRepository();