import express from "express";
import {accountInfoController, userDomainsController, organisationInfoController} from "../controllers/accountInfoController.js";


const router = express.Router();

router.get('/accountInfo', accountInfoController )
router.get('/orgInfo', organisationInfoController )
router.get('/userDomains', userDomainsController )

export default router;