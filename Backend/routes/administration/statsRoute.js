import express from 'express';
import {userStatsController, domainStatsController, postStatsController} from "../../controllers/administration/statsController.js";
const router = express.Router();

router.get('/usersStats', userStatsController )
router.get('/postsStats', postStatsController )
router.get('/domainsStats', domainStatsController )

export default router