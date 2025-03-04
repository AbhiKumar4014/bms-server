import { Request, Response } from 'express';
import WorkLogRepository from '../repositories/WorkLogRepository';
import { AuthenticatedRequest } from '../types/RequestTypes';
import logger from '../utils/logger';

class WorkLogController {
    async listWorkLogs(req: AuthenticatedRequest, res: Response) {
        let userId = req.userId as string;
        if (req.query?.user_id) {
            userId = req.query?.user_id as string;
        }
        const workLogs = await WorkLogRepository.getUserWorkLogs(userId);
        res.json(workLogs);
    }

    async getWorkLog(req: Request, res: Response) {
        const { id } = req.params;
        const workLog = await WorkLogRepository.getWorkLogById(id);
        if (workLog) {
            res.json(workLog);
        } else {
            res.status(404).send('Work Log not found');
        }
    }

    async createWorkLog(req: AuthenticatedRequest, res: Response) {
        const userId = req.userId as string;
        try {

            const workLog = await WorkLogRepository.createWorkLog({
                user_id: userId,
                project_id: req.body?.project_id,
                hours_worked: req.body.hours_worked,
                work_date: req.body?.work_date,
                task_id: req.body?.task_id,
                comments: req.body?.comments,
            });
            res.status(201).json(workLog);
        } catch (error) {
            res.status(400).json({ error: error.message });
            logger.error(error);
        }
    }

    async updateWorkLog(req: Request, res: Response) {
        const { id } = req.params;
        const updatedWorkLog = await WorkLogRepository.updateWorkLog(id, req.body);
        res.json(updatedWorkLog);
    }

    async deleteWorkLog(req: Request, res: Response) {
        const { id } = req.params;
        await WorkLogRepository.deleteWorkLog(id);
        res.status(204).send();
    }
}

export default new WorkLogController();