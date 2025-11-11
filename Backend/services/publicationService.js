//appel insertPubDescriptionModel
import { verifyToken } from "../middleware/verifyToken.js";
import {getPubDescriptionUser,getPubDescriptionOrg, insertPublication} from "../models/publicationModel.js";

export async function sendPubDescriptionService(data){
    const result = await insertPublication(data);
    return result;
}

export async function getPubDescriptionUserService(idProfil){
    const result = await getPubDescriptionUser(idProfil);
    return result;
}

export async function getPubDescriptionOrgService(req){
    verifyToken(req)
    const idProfil = req.user.id
    const result = await getPubDescriptionOrg(idProfil);
    return result;
}