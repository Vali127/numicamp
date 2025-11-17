import express from 'express'
import { getProfileController } from "../controllers/profileController.js"

const router = express.Router()

router.get('/info', getProfileController )

export default router