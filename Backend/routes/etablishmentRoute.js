import express from 'express';
import {getEtablishmentController, addEtablishmentController} from "../controllers/etablishmentController.js";
import {upload} from "../middleware/uploadSchoolPicture.js";
import {schoolImageController} from "../controllers/SchoolImageController.js";

const router = express.Router();

router.get('/getEtablishment',getEtablishmentController);
router.post('/upload/image', upload.single('image'), schoolImageController );
router.post('/register', addEtablishmentController);

export default router;