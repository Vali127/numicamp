import express from "express";
import {accountInfoController} from "../controllers/accountInfoController.js";


const router = express.Router();

router.get('/accountInfo', accountInfoController )

export default router;