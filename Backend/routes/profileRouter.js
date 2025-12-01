import express from 'express'
import { getProfileController, profileUpdateController } from "../controllers/profileController.js"

const router = express.Router()

router.get('/info', getProfileController )
router.post('/update', profileUpdateController )

export default router