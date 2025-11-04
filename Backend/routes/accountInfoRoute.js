import express from "express";
import {accountInfoController, userDomainsController} from "../controllers/accountInfoController.js";


const router = express.Router();

router.get('/accountInfo', accountInfoController )
router.get('/userDomains', userDomainsController )

export default router;