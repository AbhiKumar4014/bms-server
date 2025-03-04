import { Router } from 'express';
import WorkLogController from '../controllers/WorkLogController';
import validateUUID from '../middleware/validateUUID';
import authMiddleware from '../middleware/authMiddleware';
import authorizeRole from '../middleware/authorizeRoleMiddleware';

const router = Router();

router.get('/', authMiddleware, WorkLogController.listWorkLogs);
router.get('/:id', authMiddleware, WorkLogController.getWorkLog);
router.post('/', authMiddleware, WorkLogController.createWorkLog);
router.put('/:id', authMiddleware, authorizeRole(["manager"]), WorkLogController.updateWorkLog);
router.delete('/:id', authMiddleware, WorkLogController.deleteWorkLog);

export default router;