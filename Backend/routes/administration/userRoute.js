import express from 'express';
import {
    userBlockageController,
    userDeblockageController,
    userDeletionController,
    userListsController
} from "../../controllers/administration/usersController.js";
import {userBlockageService} from "../../services/administration/usersService.js";
const router = express.Router();

router.get('/userList', userListsController )
router.delete('/remove', userDeletionController )
router.post('/block', userBlockageController )
router.post('/unblock', userDeblockageController )

export default router;