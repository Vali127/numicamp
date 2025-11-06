import {getOrganisation} from "../models/organisationModel.js";
import {followOrganisationModel, unFollowOrganisationModel} from "../models/followModel.js";

export async function getOrganisationService(idProfil) {
        return await getOrganisation(idProfil)
}

export async function followOrganisationService(req) {
    try {
        const id_user = req.user.id
        const id_org = req.body.org_id
        return await followOrganisationModel(id_user, id_org)
    }
    catch (error) {
        console.log(error)
        throw new Error("Erreur depuis le service : "+ error)
    }
}

export async function unFollowOrganisationService(req) {
    try {
        const id_user = req.user.id
        const id_org = req.body.org_id
        return await unFollowOrganisationModel(id_user, id_org)
    }
    catch (error) {
        console.log(error)
        throw new Error("Erreur depuis le service : "+ error)
    }
}