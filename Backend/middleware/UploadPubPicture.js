import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import { generateUniqueFilename } from "../utils/fileManager.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dest = path.join(__dirname, '..', 'Users', 'Posts')
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        const uniqueFilename = generateUniqueFilename(file.originalname, "pub")
        cb(null, uniqueFilename)
    }
})

export const upload = multer({ storage })