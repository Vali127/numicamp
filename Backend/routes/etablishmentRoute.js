import express from 'express';
import {
    getEtablishmentController,
    addEtablishmentController,
    deletionController
} from "../controllers/etablishmentController.js";
import {upload} from "../middleware/uploadSchoolPicture.js";
import {schoolImageController} from "../controllers/SchoolImageController.js";

const router = express.Router();

router.get('/getEtablishment',getEtablishmentController);
router.post('/upload/image', upload.single('image'), schoolImageController );
router.post('/register', addEtablishmentController);
router.delete('/remove', deletionController );

export default router;