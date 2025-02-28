import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateUUID from '../middleware/validateUUID';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, UserController.listUsers);
router.get('/details', authMiddleware, UserController.getUser);
router.get('/notifications', authMiddleware, UserController.getNotifications);
router.post('/', authMiddleware,  UserController.createUser);
router.put('/:id', authMiddleware, UserController.updateUser);
router.delete('/:id', authMiddleware, UserController.deleteUser);

export default router; 