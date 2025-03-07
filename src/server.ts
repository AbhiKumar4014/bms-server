import { app } from "./app";
import logger from "./utils/logger";

const port = 4000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// process.on('uncaughtException', (error) => {
//     logger.error(`Uncaught Exception: ${error.message}`);
//     process.exit(1); // Exit your app with a failure code
// });

// process.on('unhandledRejection', (reason, promise) => {
//     logger.error(`Unhandled Rejection at: ${promise} reason: , ${reason}`);
//     // Application specific logging, throwing an error, or other logic here
// });