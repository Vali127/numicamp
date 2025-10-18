import express from 'express';
import {checkInfoLoginController} from "../controllers/loginController.js"
const router = express.Router();

//pour la verification des informations de connexion
router.post('/checkLoginInfo',checkInfoLoginController);

export default router;