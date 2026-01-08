import {fileURLToPath} from "url";
import path from "path";
import multer from "multer";
import {generateUniqueFilename} from "../utils/fileManager.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dest = path.join(__dirname, '..', 'Users', 'SchoolImages');
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        const uniqueFilename = generateUniqueFilename(file.originalname, "SCH");
        cb(null, uniqueFilename);
    }
})

export const upload = multer({ storage: storage });