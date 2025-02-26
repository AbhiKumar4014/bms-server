import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const validateUUID = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    
    if (!uuidRegex.test(id)) {
        logger.error(`Invalid UUID format: ${id}`);
        return res.status(404).json({ error: `Invalid UUID format: ${id}` });
    }

    next();
};

export default validateUUID; 