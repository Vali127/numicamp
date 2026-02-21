import { registerUser } from "../modules/registerServiceModules.js";
import { insertOrganisation, insertPerson } from '../models/registerModel.js';


export async function registerPersonService(data) {
    return registerUser(data, insertPerson);
}

export async function registerOrganisationService(data) {
    return registerUser(data, insertOrganisation);
}