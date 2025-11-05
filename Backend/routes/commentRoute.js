import express from 'express';
import {sendCommentController} from "../controllers/commentController.js";
const router = express.Router();

router.post('/sendComment',sendCommentController);

export default router;