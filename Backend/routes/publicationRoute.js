import express from 'express';
import {
    sendPubDescriptionController,
    getPersonPubcontroller,
    getOrgPubController,
    getPubDescriptionOrgController,
    postDeletionController, postsForOrgController
} from "../controllers/publicationController.js";
import {upload} from "../middleware/UploadPubPicture.js";
import { postImageController } from '../controllers/postImageController.js';
const router = express.Router();

//upload de l' image de publication
router.post('/uploadPostImage', upload.single('image'), postImageController);
//upload des données d publication
router.post('/sendPost', sendPubDescriptionController);
//recup info pub user
router.get('/person',getPersonPubcontroller);
router.get('/org', getOrgPubController )
//recuperer info pub org
router.get('/pubDescriptionOrg',getPubDescriptionOrgController);
router.delete('/delete', postDeletionController);

router.get("/applier", postsForOrgController );

export default router;