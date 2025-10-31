/**
 * param : req avec (titre,description,nom_profil)
 * retour : res
 */
import {getPubDescriptionUserService,getPubDescriptionOrgService, sendPubDescriptionService} from "../services/publicationService.js";

export async function sendPubDescriptionController(req, res) {
    try{
        const photoPath = req.file ? req.file.path : null;
        const { title, description, profil_name } = req.body;

        const result  = await sendPubDescriptionService({title, description, profil_name,photoPath});
        if(result.ok){
            res.status(200).json({message: "Enregistrement de publication reussi"});
        }
    }catch (err){
        res.status(err.status||500).json({ message: err.message });
    }
}

export async function getPubDescriptionUserController(req, res) {
    try{
        //recuperer les publications de l user
        const result = await getPubDescriptionUserService(req.user.id);
        if(result.ok){
            res.status(200).json({message: result.message, rows: result.rows });
        }
    }catch (err){
        res.status(err.status||500).json({ message: err.message });
    }
}

export async function getPubDescriptionOrgController(req,res) {
    try {
        //recuperer les publications des organisations ou l utilisateur est abonne
        const result = await getPubDescriptionOrgService(req.user.id);
        if(result.ok){
            res.status(200).json({message: result.message, rows: result.rows });
        }
    } catch (err) {
        res.status(err.status||500).json({ message: err.message });
    }
}