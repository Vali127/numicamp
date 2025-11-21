//appel insertPubDescriptionModel
import { verifyToken } from "../middleware/verifyToken.js";
import {getPersonPub,getPubDescriptionOrg, insertPublication, getOrgPub} from "../models/publicationModel.js";

export async function sendPubDescriptionService(data){
    const result = await insertPublication(data);
    return result;
}

export async function getPersonPubService(req, res){
    verifyToken(req, res)
    const owner = ( req.user.id === req.query.user_id )
    const result = await getPersonPub(req.query.user_id);

    return {
        ...result,
        owner : owner
    };
}

export async function getOrgPubService(req, res){
    verifyToken(req, res)
    const owner = ( req.user.id === req.query.user_id )
    const result = await getOrgPub(req.query.user_id);
    
    return {
        ...result,
        owner : owner
    };
}

export async function getPubDescriptionOrgService(req, res){
    verifyToken(req, res)
    const idProfil = req.user.id
    const result = await getPubDescriptionOrg(idProfil);
    return result;
}