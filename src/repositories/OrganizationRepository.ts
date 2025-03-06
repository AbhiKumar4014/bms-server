import { prisma } from "../config/dbConfig";

class OrganizationRepository {
    async getOrganizations() {
        return prisma.organization.findMany();
    }
}

export default new OrganizationRepository();