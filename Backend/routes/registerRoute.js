import express from 'express';
import {registerOrganisationController, registerPersonController} from '../controllers/registerController.js';

const router = express.Router();

//pour les inscriptions, fonction diff selon usage
router.post('/person', registerPersonController);
router.post('/organisation', registerOrganisationController);

export default router;
