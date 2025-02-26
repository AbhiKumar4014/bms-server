import { Router } from 'express';
import TaskAssignmentController from '../controllers/TaskAssignmentController';
import validateUUID from '../middleware/validateUUID';

const router = Router();

router.get('/', TaskAssignmentController.listTaskAssignments);
router.get('/:id', validateUUID, TaskAssignmentController.getTaskAssignment);
router.post('/', TaskAssignmentController.createTaskAssignment);
router.put('/:id', validateUUID, TaskAssignmentController.updateTaskAssignment);
router.delete('/:id', validateUUID, TaskAssignmentController.deleteTaskAssignment);

export default router; 