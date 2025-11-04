import path from 'path'
import { fileURLToPath } from 'url';

export const  postImageController = (req, res) => {
    try {
        console.log("postImagecontroller...")
        
        if (!req.file) {
            return res.status(400).json({ 
                ok: false,
                message: 'Aucun fichier fourni' 
            });
        }
        //cette sequence d' instruction extrait le chemin depuis 'Posts' du chemin absolu 
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const absolute_path = path.join(__dirname, '..', 'Users', 'Posts', req.file.filename)
        const parts = absolute_path.split(path.sep)
        const head = parts.indexOf('Users')
        const data = parts.slice(head + 1).join(path.sep)
        console.log("chemin : ", data)
        
        // Retourner le chemins du fichier uploadé
        res.status(200).json({
            ok: true,
            message: 'Photo uploadée avec succès',
            data: data
        });

    } catch (error) {
        res.status(500).json({ //yes ...using an error status on the catch block seems to work Lol...
            ok: false,
            message: 'Erreur lors de l\'upload',
            error: error.message
        });
    }
}