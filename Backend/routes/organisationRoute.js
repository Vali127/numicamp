import express from 'express';
import {verifyToken} from "../middleware/verifyToken.js";
import { getOrganisationController } from "../controllers/organisationController.js";

const router = express.Router();

router.get('/orgDomain',getOrganisationController);

export default router;