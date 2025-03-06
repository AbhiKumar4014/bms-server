import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateUUID from '../middleware/validateUUID';
import authMiddleware from '../middleware/authMiddleware';
import authorizeRole from '../middleware/authorizeRoleMiddleware';

const router = Router();

// router.get('/', authMiddleware, authorizeRole(["admin", "manager"]), UserController.listUsersByRole);

export default router;