import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import mongoose from 'mongoose';
import {db} from './config/db.js'
import servicesRoutes from "./routes/servicesRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import appointmentRoutes from "./routes/appointmentRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import {isEmailConfigured} from "./config/nodemailer.js";

//env var
dotenv.config();

//App configuration
const app = express();

//read body data
app.use(express.json());

//cors configuration
const whitelist = [
    process.env.FRONTEND_URL,
    process.env.ADDITIONAL_FRONTEND_URLS
]
    .filter(Boolean)
    .flatMap(value => value.split(','))
    .map(value => value.trim())
    .filter(Boolean);

if (process.argv[2] === '--postman'){
    whitelist.push(undefined);
}

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origin: ${origin} is not allowed by CORS`));
        }
    }
}

app.use(cors(corsOptions));

const getDatabaseStatus = () => {
    const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    };

    return states[mongoose.connection.readyState] || 'unknown';
}

const healthCheck = (req, res) => {
    const databaseStatus = getDatabaseStatus();
    const isHealthy = databaseStatus === 'connected';

    res.status(isHealthy ? 200 : 503).json({
        status: isHealthy ? 'ok' : 'degraded',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: databaseStatus,
        email: isEmailConfigured() ? 'configured' : 'missing_config',
        environment: process.env.NODE_ENV || 'development',
    });
}

//route definition
app.get('/health', healthCheck);
app.get('/api/health', healthCheck);
app.use('/api/services', servicesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

//global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({msg: 'Internal server error'});
});

//port definition
const PORT = process.env.PORT || 8000

const startServer = async () => {
    try {
        await db();
        app.listen(PORT, () => {
            console.log(colors.blue(`Server started on port:`),colors.bold(`${PORT}`));
        });
    } catch (err) {
        console.error(colors.red('Failed to start server:'), err.message);
        process.exit(1);
    }
}

//start App
startServer();
