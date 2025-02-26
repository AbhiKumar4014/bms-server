import { Request, Response } from 'express';
import WorkLogRepository from '../repositories/WorkLogRepository';

class WorkLogController {
    async listWorkLogs(req: Request, res: Response) {
        const workLogs = await WorkLogRepository.getAllWorkLogs();
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

    async createWorkLog(req: Request, res: Response) {
        const workLog = await WorkLogRepository.createWorkLog(req.body);
        res.status(201).json(workLog);
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