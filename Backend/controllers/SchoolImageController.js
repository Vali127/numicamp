import {fileURLToPath} from "url";
import path from "path";


export const schoolImageController = (req, res) => {
    try {
        console.log("Uploading school image...");
        if(!req.file) {
            return res.status(200).json({
                ok: false,
                message: "No file uploaded"
            })
        }

        //Extraction du chemin depuis 'SchoolImages' du chemin absolus
        const __filename  = fileURLToPath(import.meta.url); //current file path
        const __dirname = path.dirname(__filename); //current dir
        const absolute_path = path.join(__dirname, '..', 'Users', 'SchoolImages', req.file.filename);
        const parts = absolute_path.split(path.sep);
        const head = parts.indexOf('Users')
        const data = parts.slice(head+1).join(path.sep);
        console.log("path : ", data);
        console.log("File Uploaded !");

        res.status(200).json({
            ok: true,
            message: "photo envoyé",
            data : data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Erreur lors de l\'upload',
            error: error.message
        });
    }
}