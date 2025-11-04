import express from 'express';
import {
    sendPubDescriptionController,
    getPubDescriptionUserController,
    getPubDescriptionOrgController
} from "../controllers/publicationController.js";
import {verifyToken} from "../middleware/verifyToken.js";
import {upload} from "../middleware/UploadPubPicture.js";
import { postImageController } from '../controllers/postImageController.js';
const router = express.Router();

//upload de l' image de publication
router.post('/uploadPostImage', upload.single('image'), postImageController)
//upload des données d publication
router.post('/sendPost', sendPubDescriptionController)
//recup info pub user
router.get('/pubDescriptionUser', verifyToken,getPubDescriptionUserController);
//recuperer info pub org
router.get('/pubDescriptionOrg', verifyToken,getPubDescriptionOrgController);

export default router;