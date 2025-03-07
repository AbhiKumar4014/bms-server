import { prisma } from '../app';

class OrganizationRepository {
    async getOrganizations() {
        return prisma.organization.findMany();
    }
}

export default new OrganizationRepository();