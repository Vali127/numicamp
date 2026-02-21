import express from 'express';
import {verifyToken} from "../middleware/verifyToken.js";
import { getOrganisationController, followOrganisationController, unFollowOrganisationController } from "../controllers/organisationController.js";

const router = express.Router();

router.get('/suggestion',getOrganisationController)
router.post('/follow', followOrganisationController)
router.post('/unfollow', unFollowOrganisationController)

export default router;