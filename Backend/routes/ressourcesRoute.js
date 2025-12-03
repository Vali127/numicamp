import express from "express"
import { getRssFeedController } from "../controllers/RssFeedController.js"

const router = express.Router()

router.get('/news', getRssFeedController )

export default router