import pino from 'pino';
import fs from 'fs';
import path from 'path';

// Create a log directory if it doesn't exist
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Define log file path
const logFilePath = path.join(logDir, 'app.log');

// Create log file if it doesn't exist
if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, "", { flag: "w" });
}

// Create a logger instance
const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        targets: [
            {
                target: 'pino-pretty', // Console output
                level: 'info',
                options: {
                    colorize: true,
                    messageFormat: false, // No extra formatting
                    ignore: "pid,hostname", // Remove metadata from console
                },
            },
            {
                target: 'pino/file', // File output
                level: 'info',
                options: {
                    destination: logFilePath, // Log file path
                },
            },
        ],
    },
});

export default logger;

export const logError = (error: Error) => {
    logger.error(error.message); // Logs only the error message
};
