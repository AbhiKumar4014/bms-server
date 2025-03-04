import { Router } from 'express';
import DepartmentController from '../controllers/DepartmentController';
import validateUUID from '../middleware/validateUUID';
import authMiddleware from '../middleware/authMiddleware';
import authorizeRole from '../middleware/authorizeRoleMiddleware';

const router = Router();

router.get('/', authMiddleware, DepartmentController.listDepartments);
router.get('/users', authMiddleware, authorizeRole(["manager"]), DepartmentController.getDepartmentUsers);
router.get('/:id', authMiddleware,  validateUUID, DepartmentController.getDepartment);
router.post('/', authMiddleware, DepartmentController.createDepartment);
router.put('/:id', authMiddleware, validateUUID, DepartmentController.updateDepartment);
router.delete('/:id', authMiddleware, validateUUID, DepartmentController.deleteDepartment);

export default router;