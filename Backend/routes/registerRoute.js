import express from 'express';
import {registerOrganisationController, registerPersonController} from '../controllers/registerController.js';

const router = express.Router();

router.post('/person', registerPersonController);
router.post('/organisation', registerOrganisationController);

export default router;
