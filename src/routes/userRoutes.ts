import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateUUID from '../middleware/validateUUID';
import authMiddleware from '../middleware/authMiddleware';
import authorizeRole from '../middleware/authorizeRoleMiddleware';

const router = Router();

router.get('/', authMiddleware, UserController.listUsers);
router.get('/details', authMiddleware, UserController.getUser);
router.get('/notifications', authMiddleware, UserController.getNotifications);
router.get('/notifications/history', authMiddleware, UserController.getNotificationsHistory);
router.put('/notification/:id', authMiddleware, UserController.updateNotification);
router.post('/notification/', authMiddleware, authorizeRole(["admin", "manager"]), UserController.createNotification);
router.post('/', authMiddleware,  UserController.createUser);
router.put('/:id', authMiddleware, UserController.updateUser);
router.delete('/:id', authMiddleware, UserController.deleteUser);
router.get('/tasks/assigned', authMiddleware, UserController.getAssignedTasks);
router.get('/tasks/assigned/all', authMiddleware, authorizeRole(["admin", "manager"]), UserController.getAllAssignedTasks);

export default router; 