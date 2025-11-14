import {testConnection, pool} from './config/db.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import accountInfoRoute from "./routes/accountInfoRoute.js";
import publicationRoute from "./routes/publicationRoute.js";
import organisationRoute from "./routes/organisationRoute.js";
import commentRoute from "./routes/commentRoute.js";
import searchRoute from "./routes/searchRoute.js";
import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//chargement des variables environnement
dotenv.config();

//Lancement Express
const app = express();
app.use(express.json());

//test de connection
app.get('/test/db', async  (req, res) => {
    const result = await testConnection();
    if (result.ok) {return res.status(200).json({info: result.rows,status: 'Connected to mysql database'})}
    return  res.status(500).json({status: 'Error', info: result.error});
});

//autoriser react a envoyer des requetes
app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
))

//definition des fichiers de routage(redirige les req)
app.use('/api/register',registerRoute);
app.use('/api/login',loginRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/account', accountInfoRoute );
app.use('/api/publication',publicationRoute);
app.use('/api/organisation',organisationRoute);
app.use('/api/comment',commentRoute);
app.use('/api/search',searchRoute);
// Servir les fichiers statiques (images utilisateurs)
app.use('/static/users', express.static(path.join(__dirname, 'Users')));


//creation server et ecoute sur le port dans .env
const PORT = process.env.SERVER_PORT;

//demarrage du serveur node
const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

//fonction pour fermer le server et les connexions mysql de pool
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
    // Force la fermeture après 10s si le serveur ne se ferme pas proprement
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 3000);
}

//appel de gracefulShutdown si CTrl + C ou interruption du programme
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
