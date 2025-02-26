import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config  from "../config";


// Extend Express Request type to include userId
export interface AuthenticatedRequest extends Request {
    userId?: string;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token

    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return; // Ensure function exits after sending a response
    }

    jwt.verify(token, config.jwtSecretKey || "your_jwt_secret", (err: any, decoded: any) => {
        if (err) {
            res.status(403).json({ error: "Failed to authenticate token" });
            return; // Ensure function exits after sending a response
        }

        req.userId = decoded.id; // Attach userId to request
        next(); // ✅ Ensures proper middleware execution
    });
};

export default authMiddleware;