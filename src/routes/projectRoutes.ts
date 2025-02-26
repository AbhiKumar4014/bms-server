import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import validateUUID from '../middleware/validateUUID';

const router = Router();

router.get('/', ProjectController.listProjects);
router.get('/:id', validateUUID, ProjectController.getProject);
router.post('/', ProjectController.createProject);
router.put('/:id', validateUUID, ProjectController.updateProject);
router.delete('/:id', validateUUID, ProjectController.deleteProject);

export default router; 
