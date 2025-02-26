import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import validateUUID from '../middleware/validateUUID';

const router = Router();

router.get('/', TaskController.listTasks);
router.get('/:id', validateUUID, TaskController.getTask);
router.post('/', TaskController.createTask);
router.put('/:id', validateUUID, TaskController.updateTask);
router.delete('/:id', validateUUID, TaskController.deleteTask);

export default router; 