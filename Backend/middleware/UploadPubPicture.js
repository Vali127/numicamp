import multer from "multer";
import path from "node:path";

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/publications"); // dossier de destination
    },
    filename: (req, file, cb) => {
        const uniqueName = `pub_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });
export default upload;
