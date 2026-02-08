import express from 'express';
import {
    createPublicationController,
    getUserPublicationsController,
    getOrganizationPublicationsController,
    getSubscribedOrganizationsPublicationsController,
    deletePublicationController,
    getOrganizationApplicantsController
} from "../controllers/publicationController.js";
import {upload} from "../middleware/UploadPubPicture.js";
import { uploadPublicationImageController } from '../controllers/postImageController.js';

const router = express.Router();

router.post('/upload-image', upload.single('image'), uploadPublicationImageController);
router.post('/create', createPublicationController);
router.get('/user', getUserPublicationsController);
router.get('/organization', getOrganizationPublicationsController);
router.get('/subscribed', getSubscribedOrganizationsPublicationsController);
router.get('/applicants', getOrganizationApplicantsController);
router.delete('/delete', deletePublicationController);

export default router;