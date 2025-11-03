import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tempDir = path.join(__dirname, '..', 'Users', 'publications');
        cb(null, tempDir);    },
    filename: (req, file, cb) => {
        const uniqueName = `pub_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });
export default upload;
