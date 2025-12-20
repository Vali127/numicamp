import express from 'express';
import {getEtablishmentController} from "../controllers/etablishmentController.js";

const router = express.Router();

router.get('/getEtablishment',getEtablishmentController);

export default router;