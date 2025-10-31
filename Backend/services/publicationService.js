//appel insertPubDescriptionModel
import {getPubDescriptionUser,getPubDescriptionOrg, insertPublication} from "../models/publicationModel.js";

export async function sendPubDescriptionService(data){
    const result = await insertPublication(data);
    return result;
}

export async function getPubDescriptionUserService(idProfil){
    const result = await getPubDescriptionUser(idProfil);
    return result;
}

export async function getPubDescriptionOrgService(idProfil){
    const result = await getPubDescriptionOrg(idProfil);
    return result;
}