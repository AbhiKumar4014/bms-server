import authMiddleware from "../middleware/authMiddleware";
import authorizeRole from "../middleware/authorizeRoleMiddleware";
import DesignationController from "../controllers/DesignationController";
import { Router } from "express";

const router = Router();

router.get("/", authMiddleware, authorizeRole(["admin"]), DesignationController.getDesignations);

export default router;