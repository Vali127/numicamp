import express from 'express';
import {sendPubDescriptionController} from "../controllers/publicationController.js";
import {verifyToken} from "../middleware/verifyToken.js";
import upload from "../middleware/UploadPubPicture.js";
const router = express.Router();

router.post('/pubDescription', verifyToken,upload.single('photo_pub'),sendPubDescriptionController);

export default router;