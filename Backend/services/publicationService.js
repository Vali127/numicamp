//appel insertPubDescriptionModel
import {insertPublication} from "../models/publicationModel.js";

export async function sendPubDescriptionService(data){
    const result = await insertPublication(data);
    return result;
}