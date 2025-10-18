import express from "express";
import { profileController } from "../controllers/profileController.js";
import { upload } from "../middleware/UploadProfilePicture.js";

const router = express.Router();

router.post('/profil', upload.single('file'),profileController);


export default router;