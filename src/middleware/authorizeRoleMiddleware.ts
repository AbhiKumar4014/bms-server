import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/RequestTypes";
import UserRepository from "../repositories/UserRepository";

const authorizeRole = (roles: string | string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.userId as string;
      const user = await UserRepository.getUserById(userId);
      req.user = user;

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const roleArray = Array.isArray(roles) ? roles : [roles];

      if (!roleArray.includes(user.role)) {
        return res.status(403).json({ error: "You don't have permission to access this resource." });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  };
};

export default authorizeRole;
