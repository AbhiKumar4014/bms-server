import { prisma } from '../config/dbConfig';
import { ClientData } from '../types/clientTypes';


class ClientRepository {
    async getAllClients() {
        return await prisma.clients.findMany();
    }

    async getClientById(id: string) {
        return await prisma.clients.findUnique({
            where: { id },
        });
    }

    async createClient(clientData: ClientData) {
        return await prisma.clients.create({
            data: clientData,
        });
    }

    async updateClient(id: string, clientData: Partial<ClientData>) {
        return await prisma.clients.update({
            where: { id },
            data: clientData,
        });
    }

    async deleteClient(id: string) {
        return await prisma.clients.delete({
            where: { id },
        });
    }
}

export default new ClientRepository();