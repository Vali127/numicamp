import express from 'express';
import {validateInfoLogin} from "../middleware/infoLoginValidation.js";
import {checkInfoLoginController} from "../controllers/loginController.js"
const router = express.Router();

//pour la verification si info de connexion non vide(validateInfoLogin) et correcte(checkInfoLogin)
router.get('/checkLoginInfo',validateInfoLogin,checkInfoLoginController);

export default router;