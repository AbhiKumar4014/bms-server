import { Router } from 'express';
import WorkLogController from '../controllers/WorkLogController';
import validateUUID from '../middleware/validateUUID';

const router = Router();

router.get('/', WorkLogController.listWorkLogs);
router.get('/:id', validateUUID, WorkLogController.getWorkLog);
router.post('/', WorkLogController.createWorkLog);
router.put('/:id', validateUUID, WorkLogController.updateWorkLog);
router.delete('/:id', validateUUID, WorkLogController.deleteWorkLog);

export default router; 