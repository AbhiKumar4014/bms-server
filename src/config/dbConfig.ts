import { Prisma, PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

export const getPrismaClient = () => {

    try {
        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                },
            },
        });

        prisma.$on('query', (e) => {
            logger.info(`Query: ${e.query} Params: ${e.params}`);
        });

        prisma.$on('error', (e) => {
            logger.error(`Database Error: ${e.message}`);
        });

        logger.info('Prisma client initialized successfully.');
        return prisma;
    } catch (error) {
        logger.error(`Database Connection Error: ${error.message}`);
        throw error;
    }
};

