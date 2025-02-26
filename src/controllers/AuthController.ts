import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import logger from '../utils/logger';
import jwt from "jsonwebtoken";
import config from '../config';
import bcrypt from "bcrypt"; // Import bcrypt

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { name, email, password, role } = req.body;
            logger.info({name, email, password, role});
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
            const user = await UserRepository.createUser({name, email, password_hash: hashedPassword, role: role? role: "Consultant"});
            res.status(201).json(user);
        } catch (error) {
            logger.error(`Error registering user: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email) {
                return res.status(400).json({ error: "Email is required" });
            }
            if (!password) {
                return res.status(400).json({ error: "Password is required" });
            }
            const user = await UserRepository.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Here you should check the password, using a hash comparison
            // For simplicity, this example assumes the password matches directly
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);
            logger.info({isPasswordValid, password, hashPasword: user.password_hash})
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const token = jwt.sign(
                { id: user.id, role: user.role, email: user.email },
                config.jwtSecretKey || "your_jwt_secret",
                { expiresIn: "1h" }
            );
            res.json({ message: 'Login successful', token });
        } catch (error) {
            logger.error(`Error logging in: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new AuthController(); 