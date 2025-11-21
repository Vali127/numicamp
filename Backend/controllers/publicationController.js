/**
 * param : req avec (titre,description)
 * retour : res
 */
import { verifyToken } from "../middleware/verifyToken.js";
import {getPersonPubService,getOrgPubService,getPubDescriptionOrgService, sendPubDescriptionService} from "../services/publicationService.js";

export async function sendPubDescriptionController(req, res) {
    try{
        console.log(" Publication controller ...")
        const { title, description, photoPath, keywords, domains } = req.body;
        verifyToken(req, res)
        const id = req.user.id

        const result  = await sendPubDescriptionService({title, description,photoPath,keywords,domains,id});
        if(result.ok){
            res.status(200).json({message: "Enregistrement de publication reussi"});
        }
    }catch (err){
        res.status(err.status||500).json({ message: err.message });
    }
}

export async function getPersonPubcontroller(req, res) {
    try{
        //recuperer les publications de l user
        const result = await getPersonPubService(req, res);
        if(result.ok){
            res.status(200).json({message: result.message, rows: result.rows });
        }
    }catch (err){
        res.status(err.status||500).json({ message: err.message });
    }
}

export async function getOrgPubController(req, res) {
    try{
        //recuperer les publications de l user
        const result = await getOrgPubService(req, res);
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
        const result = await getPubDescriptionOrgService(req,res);
        if(result.ok){
            res.status(200).json({message: result.message, rows: result.rows, ok: result.ok });
        }
    } catch (err) {
        res.status(err.status||500).json({ message: err.message , ok: false });
    }
}