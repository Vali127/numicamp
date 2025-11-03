import {getOrganisation} from "../models/organisationModel.js";

export async function getOrganisationService(idProfil) {
        const result = await getOrganisation(idProfil);
        return result;
}