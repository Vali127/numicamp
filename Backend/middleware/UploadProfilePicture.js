import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import { generateUniqueFilename } from "../utils/fileManager.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Ce template de code provient du documentation du module 'multer' de npm.
// Ca defini en general la destination du fichier et son nommage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const tempDir = path.join(__dirname, '..', 'Users', 'temp');
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        const uniqueFilename = generateUniqueFilename(file.originalname, "pfp");
        cb(null, uniqueFilename);
    }
})

const fileFilter = (req, file, cb) => {
    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Type de fichier non supporté. Veuillez choisir une image (JPEG, PNG, GIF, WebP).'), false);
    }
};

export const upload = multer({ 
    storage, 
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})