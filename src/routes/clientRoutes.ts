import { Router } from 'express';
import ClientController from '../controllers/ClientController';
import validateUUID from '../middleware/validateUUID';

const router = Router();

router.get('/', ClientController.listClients);
router.get('/:id', validateUUID, ClientController.getClient);
router.post('/', ClientController.createClient);
router.put('/:id', validateUUID, ClientController.updateClient);
router.delete('/:id', validateUUID, ClientController.deleteClient);

export default router; 