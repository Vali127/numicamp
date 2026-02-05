import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import {pool} from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

//Lazy loading
app.use('/api/register', (req, res, next) => import('./routes/registerRoute.js').then(m => m.default(req, res, next)));
app.use('/api/login', (req, res, next) => import('./routes/loginRoute.js').then(m => m.default(req, res, next)));
app.use('/api/logout', (req, res, next) => import('./routes/logoutRoute.js').then(m => m.default(req, res, next)));
app.use('/api/upload', (req, res, next) => import('./routes/uploadRoute.js').then(m => m.default(req, res, next)));
app.use('/api/account', (req, res, next) => import('./routes/accountInfoRoute.js').then(m => m.default(req, res, next)));
app.use('/api/publication', (req, res, next) => import('./routes/publicationRoute.js').then(m => m.default(req, res, next)));
app.use('/api/organisation', (req, res, next) => import('./routes/organisationRoute.js').then(m => m.default(req, res, next)));
app.use('/api/profile', (req, res, next) => import('./routes/profileRouter.js').then(m => m.default(req, res, next)));
app.use('/api/comment', (req, res, next) => import('./routes/commentRoute.js').then(m => m.default(req, res, next)));
app.use('/api/search', (req, res, next) => import('./routes/searchRoute.js').then(m => m.default(req, res, next)));
app.use('/api/feedback', (req, res, next) => import('./routes/feedbackRoute.js').then(m => m.default(req, res, next)));
app.use('/api/resources', (req, res, next) => import('./routes/ressourcesRoute.js').then(m => m.default(req, res, next)));
app.use('/api/stats', (req, res, next) => import('./routes/administration/statsRoute.js').then(m => m.default(req, res, next)));
app.use('/api/users', (req, res, next) => import('./routes/administration/userRoute.js').then(m => m.default(req, res, next)));
app.use('/api/etablishment', (req, res, next) => import('./routes/etablishmentRoute.js').then(m => m.default(req, res, next)));

//ENDPOINT FOR FILE SERVICE
app.use('/static/users', express.static(path.join(__dirname, 'Users')));

const PORT = process.env.SERVER_PORT;
const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

async function gracefulShutdown() {
    console.log('Shutting down...');
    server.close(async () => {
        try {
            await pool.end();
            console.log('MySQL pool closed');
            process.exit(0);
        } catch (err) {
            console.error('Error closing pool', err);
            process.exit(1);
        }
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 3000);
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);