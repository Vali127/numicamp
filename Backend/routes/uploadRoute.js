import express from 'express';
import { upload } from '../middleware/UploadProfilePicture.js';

const router = express.Router();

// Endpoint pour upload temporaire du photo de profil
router.post('/temp-profile-picture', upload.single('profilePicture'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                ok: false,
                message: 'Aucun fichier fourni' 
            });
        }

        // Retourner les informations(métadonnées) du fichier uploadé
        res.status(200).json({
            ok: true,
            message: 'Photo uploadée avec succès',
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Erreur lors de l\'upload',
            error: error.message
        });
    }
});

export default router;
