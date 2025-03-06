import DesignationRepository from "../repositories/DesignationRepository";
import { Request, Response } from 'express';
import logger from "../utils/logger";

class DesignationController {
   async getDesignations(req: Request, res: Response) {
    try {
        const response = await DesignationRepository.getDesignations();
        return res.json(response);
    } catch (error) {
        logger.error(`Error in DesignationController.getDesignations ${error}`);
        throw error;
    }
  }
}

export default new DesignationController();