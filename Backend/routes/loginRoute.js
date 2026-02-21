import express from 'express';
import {checkInfoLoginController} from "../controllers/loginController.js"
const router = express.Router();

router.post('/checkLoginInfo',checkInfoLoginController);

export default router;