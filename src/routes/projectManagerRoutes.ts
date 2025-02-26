import { Router } from 'express';
import ProjectManagerController from '../controllers/ProjectManagerController';
import validateUUID from '../middleware/validateUUID';

const router = Router();

router.get('/', ProjectManagerController.listProjectManagers);
router.get('/:id', validateUUID, ProjectManagerController.getProjectManager);
router.post('/', ProjectManagerController.createProjectManager);
router.put('/:id', validateUUID, ProjectManagerController.updateProjectManager);
router.delete('/:id', validateUUID, ProjectManagerController.deleteProjectManager);

export default router; 