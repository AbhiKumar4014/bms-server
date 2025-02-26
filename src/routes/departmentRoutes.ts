import { Router } from 'express';
import DepartmentController from '../controllers/DepartmentController';
import validateUUID from '../middleware/validateUUID';

const router = Router();

router.get('/', DepartmentController.listDepartments);
router.get('/:id', validateUUID, DepartmentController.getDepartment);
router.post('/', DepartmentController.createDepartment);
router.put('/:id', validateUUID, DepartmentController.updateDepartment);
router.delete('/:id', validateUUID, DepartmentController.deleteDepartment);

export default router; 