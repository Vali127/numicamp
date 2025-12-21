//appel insertPubDescriptionModel
import {verifyToken} from "../middleware/verifyToken.js";
import {
    deletePost,
    getOrgPub,
    getPersonPub,
    getPubDescriptionOrg,
    insertPublication
} from "../models/publicationModel.js";

export async function sendPubDescriptionService(data){
    return await insertPublication(data);
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
    const owner = ( req.user.id === req.query.user_id )
    const idProfil = req.user.id
    const result = await getPubDescriptionOrg(idProfil);

    return {
        ...result,
        owner : owner
    }
}

export async function postDeletionService(req, res){
    try {
        verifyToken(req, res)
        const response = await deletePost(req.query.id_post)
        const message = (response) ? "Suppression effectuée avec succès " : "Échec de la suppression réessayez plus tard !"

        return {
            ok : response,
            message : message,
        }

    } catch (err) {
        console.log(err);
        throw Error(err);
    }
}