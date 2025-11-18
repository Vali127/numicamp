import express from 'express';
import {searchController} from '../controllers/searchController.js';

const router = express.Router();

//pour les inscriptions, fonction diff selon usage
router.get('/everything', searchController);

export default router;