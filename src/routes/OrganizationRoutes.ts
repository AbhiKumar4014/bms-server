import { Router } from 'express';
import OrganizationController from '../controllers/OrganizationController';
import authorizeRole from '../middleware/authorizeRoleMiddleware';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, authorizeRole(["admin"]), OrganizationController.getOrganizations);

export default router;