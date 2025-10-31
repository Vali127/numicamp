import express from 'express';
import {
    sendPubDescriptionController,
    getPubDescriptionUserController,
    getPubDescriptionOrgController
} from "../controllers/publicationController.js";
import {verifyToken} from "../middleware/verifyToken.js";
import upload from "../middleware/UploadPubPicture.js";
const router = express.Router();

router.post('/pubDescription', verifyToken,upload.single('photo_pub'),sendPubDescriptionController);
router.get('/pubDescriptionUser', verifyToken,getPubDescriptionUserController);
router.get('/pubDescriptionOrg', verifyToken,getPubDescriptionOrgController);

export default router;