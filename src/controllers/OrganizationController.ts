import OrganizationRepository from "../repositories/OrganizationRepository"
import { Request, Response } from 'express';
import logger from "../utils/logger";

class OrganizationController {
   async getOrganizations(req: Request, res: Response) {
    try {
        const response = await OrganizationRepository.getOrganizations();
        return res.json(response);
    } catch (error) {
        logger.error(`Error in OrganizationController.getOrganizations ${error}`);
        throw error;
    }
  }
}

export default new OrganizationController();