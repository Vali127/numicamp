import express from "express"
import { getRssFeedController, getSiteController } from "../controllers/RssFeedController.js"

const router = express.Router()

router.get('/news', getRssFeedController )
router.get('/sites', getSiteController )

export default router