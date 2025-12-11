import express from 'express';
import {userStatsController, domainStatsController} from "../../controllers/administration/statsController.js";
const router = express.Router();

router.get('/usersStats', userStatsController )
router.get('/domainsStats', domainStatsController )

export default router