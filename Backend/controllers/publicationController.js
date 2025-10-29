/**
 * param : req avec (titre,description,nom_profil)
 * retour : res
 */
import {sendPubDescriptionService} from "../services/publicationService.js";

export async function sendPubDescriptionController(req, res) {
    try{
        const photoPath = req.file ? req.file.path : null;
        const { title, description, profil_name } = req.body;

        const result  = await sendPubDescriptionService({title, description, profil_name,photoPath});
        if(result.ok){
            res.status(200).json({message: "Enregistrement de publication reussi"});
        }
    }catch (err){
        res.status(error.status||500).json({ message: error.message });
    }
}