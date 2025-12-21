import express from 'express';
import {
    getFeedBackController,
    sendFeedBackController
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post('/send', sendFeedBackController)
router.get('/list', getFeedBackController )

export default router;