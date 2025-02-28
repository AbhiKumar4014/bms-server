import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import validateUUID from '../middleware/validateUUID';
import authMiddleware from '../middleware/authMiddleware';
import authorizeRole from '../middleware/authorizeRoleMiddleware';

const router = Router();

router.get('/', authMiddleware, authorizeRole(["admin", "manager"]), ProjectController.listProjects);
router.get('/:id', authMiddleware, authorizeRole(["admin", "manager"]), validateUUID, ProjectController.getProject);
router.post('/', authMiddleware, authorizeRole(["admin", "manager"]), ProjectController.createProject);
router.put('/:id', authMiddleware, authorizeRole(["admin", "manager"]), validateUUID, ProjectController.updateProject);
router.delete('/:id', authMiddleware, authorizeRole(["admin", "manager"]), validateUUID, ProjectController.deleteProject);

export default router; 
