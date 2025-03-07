import express from 'express';
import userRoutes from './routes/userRoutes';
import clientRoutes from './routes/clientRoutes';
import consultantRoutes from './routes/consultantRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import departmentRoutes from './routes/departmentRoutes';
import projectManagerRoutes from './routes/projectManagerRoutes';
import taskAssignmentRoutes from './routes/taskAssignmentRoutes';
import organizationRoutes from './routes/OrganizationRoutes';
import designationRoutes from './routes/DesignationRoutes';
import workLogRoutes from './routes/workLogRoutes';
import authRoutes from './routes/authRoutes';
import requestLogger from './middleware/requestLogger';
import logger from './utils/logger';
import { getPrismaClient } from './config/dbConfig';
import cors from 'cors';
import path from 'path';

const prisma = getPrismaClient();
const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/user', userRoutes);
app.use('/clients', clientRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/departments', departmentRoutes);
app.use('/project-managers', projectManagerRoutes);
app.use('/task-assignment', taskAssignmentRoutes);
app.use('/work-logs', workLogRoutes);
app.use('/auth', authRoutes);
app.use('/organizations', organizationRoutes);
app.use('/designations', designationRoutes);

process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise} reason: , ${reason}`);
});

export { app, prisma };
