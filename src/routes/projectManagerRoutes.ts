import { Router } from 'express';
import ProjectManagerController from '../controllers/ProjectManagerController';
import validateUUID from '../middleware/validateUUID';
import authMiddleware from '../middleware/authMiddleware';
import authorizeRole from '../middleware/authorizeRoleMiddleware';

const router = Router();

router.get('/', authMiddleware, authorizeRole("admin"), ProjectManagerController.listProjectManagers);
router.get('/:id', authMiddleware, authorizeRole(["admin", "manager"]), validateUUID, ProjectManagerController.getProjectManager);
router.post('/', authMiddleware, authorizeRole(["admin", "manager"]), ProjectManagerController.createProjectManager);
router.put('/:id', authMiddleware, authorizeRole(["admin", "manager"]), validateUUID, ProjectManagerController.updateProjectManager);
router.delete('/:id', authMiddleware, authorizeRole(["admin", "manager"]), validateUUID, ProjectManagerController.deleteProjectManager);

export default router; 