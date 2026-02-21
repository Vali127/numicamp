import path from 'path';
import { fileURLToPath } from 'url';

export const uploadPublicationImageController = (req, res) => {
    try {
        console.log("uploadPublicationImageController...");
        
        if (!req.file) {
            return res.status(400).json({ 
                ok: false,
                message: 'No file provided' 
            });
        }
        
        // Extract relative path from absolute path starting from 'Users'
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const absolutePath = path.join(__dirname, '..', 'Users', 'Posts', req.file.filename);
        const parts = absolutePath.split(path.sep);
        const usersIndex = parts.indexOf('Users');
        const relativePath = parts.slice(usersIndex + 1).join(path.sep);
        
        console.log("Publication image path:", relativePath);
        
        // Return the uploaded file path
        res.status(200).json({
            ok: true,
            message: 'Publication image uploaded successfully',
            data: relativePath
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error during image upload',
            error: error.message
        });
    }
};