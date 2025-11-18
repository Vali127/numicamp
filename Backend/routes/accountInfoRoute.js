import express from "express";
import {accountInfoController, userDomainsController, organisationInfoController, personInfoController} from "../controllers/accountInfoController.js";


const router = express.Router();

router.get('/accountInfo', accountInfoController )
router.get('/orgInfo', organisationInfoController )
router.get('/personInfo', personInfoController )
router.get('/userDomains', userDomainsController )

export default router;