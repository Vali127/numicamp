/**
 * param : req avec (titre,description)
 * retour : res
 */
import { verifyToken } from "../middleware/verifyToken.js";
import {getPersonPubService,getOrgPubService,getPubDescriptionOrgService, sendPubDescriptionService, postDeletionService} from "../services/publicationService.js";

export async function sendPubDescriptionController(req, res) {
    try{
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
            res.status(200).json({message: result.message, rows: result.rows, owner : result.owner });
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
            res.status(200).json({message: result.message, rows: result.rows, owner : result.owner });
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
            res.status(200).json({message: result.message, rows: result.rows, ok: result.ok, owner : result.owner });
        }
    } catch (err) {
        res.status(err.status||500).json({ message: err.message , ok: false });
    }
}

export async  function postDeletionController(req, res) {
    try {
        const result = await  postDeletionService(req,res);
        res.status(200).json({message: result.message, ok : result.ok });
    } catch (err) {
        res.status(err.status||500).json({ message: err.message });
        console.log("ERROR \n", err)
    }
}