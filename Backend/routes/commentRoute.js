import express from 'express';
import {sendCommentController,getCommentController} from "../controllers/commentController.js";
const router = express.Router();

router.post('/sendComment',sendCommentController);
router.get('getComment',getCommentController);

export default router;