import express from "express"
import { getRssFeedController, getSiteController, getResourceListController, ResourceRegistrationController,ResourceDeletionController  } from "../controllers/RssFeedController.js"

const router = express.Router()

router.get('/news', getRssFeedController )
router.get('/sites', getSiteController )
router.get('/lists', getResourceListController)
router.post('/register', ResourceRegistrationController )
router.delete('/remove', ResourceDeletionController)

export default router