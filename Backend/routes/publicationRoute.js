import express from 'express';
import {
    sendPubDescriptionController,
    getPubDescriptionUserController,
    getPubDescriptionOrgController
} from "../controllers/publicationController.js";
import {verifyToken} from "../middleware/verifyToken.js";
import upload from "../middleware/UploadPubPicture.js";
const router = express.Router();

//envoie info pub
router.post('/pubDescription', verifyToken,upload.single('photo_pub'),sendPubDescriptionController);
//recup info pub user
router.get('/pubDescriptionUser', verifyToken,getPubDescriptionUserController);
//recuperer info pub org
router.get('/pubDescriptionOrg', verifyToken,getPubDescriptionOrgController);

export default router;