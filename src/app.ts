import express from 'express';
import userRoutes from './routes/userRoutes';
import clientRoutes from './routes/clientRoutes';
import consultantRoutes from './routes/consultantRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import departmentRoutes from './routes/departmentRoutes';
import projectManagerRoutes from './routes/projectManagerRoutes';
import taskAssignmentRoutes from './routes/taskAssignmentRoutes';
import workLogRoutes from './routes/workLogRoutes';
import authRoutes from './routes/authRoutes';
import requestLogger from './middleware/requestLogger';
import logger from './utils/logger';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(cors());

app.use('/user', userRoutes);
app.use('/consultant', consultantRoutes);
app.use('/clients', clientRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/departments', departmentRoutes);
app.use('/project-managers', projectManagerRoutes);
app.use('/task-assignments', taskAssignmentRoutes);
app.use('/work-logs', workLogRoutes);
app.use('/auth', authRoutes);

app.listen(3000, () => {
    logger.info('Server running on http://localhost:3000');
});

process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export default app;
