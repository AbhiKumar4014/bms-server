import { Request, Response } from 'express';
import EmployeeRepository from '../repositories/EmployeeRepository';
import { buildEmployeeHierarchy, buildHierarchy } from '../utils/helper';
import logger from '../utils/logger';

class EmployeeController {
    async getEmployeeHeirarchy(req: Request, res: Response) {
        const userId = req.query?.user_id as string;
        let response;
        try {

            if (!userId) {
                response = await EmployeeRepository.getEmployeeHierarchy(req?.userId);
            }
            else {
                response = await EmployeeRepository.getEmployeeHierarchy(userId);
            }
            console.log(response);
            const modifiedResponse = buildHierarchy(response);
            console.log(modifiedResponse)
            return res.json(modifiedResponse);
        } catch (error) {
            logger.error(`Error fetching employee hierarchy: ${error}`);

            return res.status(500).json({ error: "Internal Server Error" });
            // throw error;
        }
    }

    async getOrganizationHeirachy(req: Request, res: Response) {
        const userId = req.query?.user_id as string;
        let response;
        try {
            response = await EmployeeRepository.getEmployeeHierarchy(userId);
            return res.json(response);
        } catch (error) {
            logger.error(`Error fetching employee hierarchy: ${error}`);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getOrganizationChart(req: Request, res: Response) {
        const userId = req.query?.emp_id as string;
        let response;
        try {
            response = await EmployeeRepository.getOrganizationHierarchy(userId);
            const modifiedResponse = buildHierarchy(response);
            console.log(modifiedResponse)
            return res.json(modifiedResponse);
        } catch (error) {
            logger.error(`Error fetching employee hierarchy: ${error}`);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

export default new EmployeeController();