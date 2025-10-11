import {testConnection, pool,getRole} from './config/db.js';
import express from 'express';
import dotenv from 'dotenv';
import registerRoute from "./routes/registerRoute.js";
import cors from "cors";
//chargement des variables environnement
dotenv.config();

//Lancement Express
const app = express();
app.use(express.json());

//test de connection
app.get('/test/db', async  (req, res) => {
    const result = await testConnection();
    if (result.ok) {return res.status(200).json({info: result.rows,status: 'Connected to mysql database'})};
    return  res.status(500).json({status: 'Error', info: result.error});
});

//autoriser react a envoyer des requetes
app.use(cors(
    {
        origin: 'localhost',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
))

//definition des fichiers de routage(redirige les req)
app.use('/api/register',registerRoute);

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
}

//appel de gracefulShutdown si CTrl + C ou interruption du programme
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
