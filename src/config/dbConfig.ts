import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

// Create a single instance of PrismaClient
let prisma: PrismaClient;

export const getPrismaClient = () => {
    if (!prisma) {
        prisma = new PrismaClient({
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
    }
    return prisma;
};
