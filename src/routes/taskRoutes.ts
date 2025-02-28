import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import validateUUID from '../middleware/validateUUID';
import authMiddleware from '../middleware/authMiddleware';
import authorizeRole from '../middleware/authorizeRoleMiddleware';

const router = Router();

router.get('/', authMiddleware, authorizeRole(["admin", "manager"]), TaskController.listTasks);
router.get('/:id', authMiddleware, authorizeRole(["admin", "manager"]),  validateUUID, TaskController.getTask);
router.post('/', authMiddleware, authorizeRole(["admin", "manager"]),  TaskController.createTask);
router.put('/:id', authMiddleware, authorizeRole(["admin", "manager"]),  validateUUID, TaskController.updateTask);
router.delete('/:id', authMiddleware, authorizeRole(["admin", "manager"]),  validateUUID, TaskController.deleteTask);

export default router; 