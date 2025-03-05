import { Router } from 'express';
import ClientController from '../controllers/ClientController';
import validateUUID from '../middleware/validateUUID';
import authMiddleware from '../middleware/authMiddleware';
import authorizeRole from '../middleware/authorizeRoleMiddleware';

const router = Router();

router.get('/', authMiddleware, authorizeRole(["admin", "manager"]), ClientController.listClients);
router.get('/:id', authMiddleware, authorizeRole(["admin", "manager"]), validateUUID, ClientController.getClient);
router.post('/', authMiddleware, authorizeRole(["admin"]), ClientController.createClient);
router.put('/:id', authMiddleware, authorizeRole(["admin"]), validateUUID, ClientController.updateClient);
router.delete('/:id', authMiddleware, authorizeRole(["admin"]), validateUUID, ClientController.deleteClient);

export default router;