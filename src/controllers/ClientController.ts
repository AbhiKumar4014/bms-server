import { Request, Response } from 'express';
import ClientRepository from '../repositories/ClientRepository';
import logger from '../utils/logger';

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
        try {

            const client = await ClientRepository.createClient(req.body);
            res.status(201).json(client);
        } catch(err: unknown) {
            logger.info(err)
            res.status(400).json({error: err?.message});
        }
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