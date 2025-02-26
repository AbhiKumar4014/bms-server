import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const logDetails = {
        method: req.method,
        path: req.path,
    };
    logger.info(`Request Details: ${JSON.stringify(logDetails)}`);
    next();
};

export default requestLogger; 