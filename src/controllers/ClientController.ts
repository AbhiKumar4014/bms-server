import { Request, Response } from 'express';
import ClientRepository from '../repositories/ClientRepository';

class ClientController {
    async listClients(req: Request, res: Response) {
        const clients = await ClientRepository.getAllClients();
        res.json(clients);
    }

    async getClient(req: Request, res: Response) {
        const { id } = req.params;
        const client = await ClientRepository.getClientById(id);
        if (client) {
            res.json(client);
        } else {
            res.status(404).send('Client not found');
        }
    }

    async createClient(req: Request, res: Response) {
        const client = await ClientRepository.createClient(req.body);
        res.status(201).json(client);
    }

    async updateClient(req: Request, res: Response) {
        const { id } = req.params;
        const updatedClient = await ClientRepository.updateClient(id, req.body);
        res.json(updatedClient);
    }

    async deleteClient(req: Request, res: Response) {
        const { id } = req.params;
        await ClientRepository.deleteClient(id);
        res.status(204).send();
    }
}

export default new ClientController(); 